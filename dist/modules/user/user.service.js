"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const cache_manager_1 = require("cache-manager");
const chat_gateway_1 = require("../socket/chat.gateway");
const constants_1 = require("../../constants/constants");
const model_utils_1 = require("../../utils/model.utils");
const utils_1 = require("../../utils/utils");
const conversation_service_1 = require("../conversation/conversation.service");
const logger_service_1 = require("../logger/logger.service");
const user_embedded_service_1 = require("../user_embedded/user_embedded.service");
const user_entities_1 = require("./entities/user.entities");
const user_helper_1 = require("./helper/user.helper");
let UserService = class UserService {
    constructor(userModel, cacheManager, chatGateway, userEmbeddedService, loggerService, conversationService, userHelper) {
        this.userModel = userModel;
        this.cacheManager = cacheManager;
        this.chatGateway = chatGateway;
        this.userEmbeddedService = userEmbeddedService;
        this.loggerService = loggerService;
        this.conversationService = conversationService;
        this.userHelper = userHelper;
        this.loggerService.setContext('UserService');
    }
    async createWithOAuth2(userGoogle) {
        try {
            const user = await this.userModel.create(userGoogle);
            return await user.save();
        }
        catch (error) {
            throw error;
        }
    }
    async changePassword(oldPassword, newPassword, user) {
        try {
            await this.isNotCorrectPassword(oldPassword, user.password);
            const hashPassword = await this.hashPassword(newPassword);
            const newUser = await this.userModel.findOneAndUpdate({ _id: user._id }, { $set: { password: hashPassword } });
            return newUser ? true : false;
        }
        catch (error) {
            throw error;
        }
    }
    async resetPassword(user, password) {
        try {
            const newUser = new this.userModel(user);
            newUser.password = password;
            return (await newUser.save()) ? true : false;
        }
        catch (error) {
            throw error;
        }
    }
    async findOne(filter) {
        try {
            const user = await this.userModel
                .findOne(filter)
                .select(constants_1.Constants.EXCLUDE_FIELDS);
            (0, model_utils_1.throwIfNotExists)(user, 'Không tìm thấy User tương ứng');
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    async getOne(filter) {
        try {
            const user = await this.userModel.findOne(filter);
            return user ? user : undefined;
        }
        catch (error) {
            throw error;
        }
    }
    async getAllUser(pagination, filter, user) {
        try {
            let maxDistance = user.mySetting.discovery.distance * 1000;
            const queryFilter = await this.userHelper.buildQueryWithUser(user, filter);
            if (user.mySetting.discovery.onlyShowDistanceThisRange === false) {
                maxDistance = constants_1.Constants.DEFAULT_DISTANCE;
                this.loggerService.debug(`MaxDistance:${maxDistance}`);
            }
            const [results, totalCount] = await Promise.all([
                this.userModel.aggregate([
                    {
                        $geoNear: {
                            near: { type: 'Point', coordinates: [106.6510748, 10.7715686] },
                            spherical: true,
                            distanceField: 'calcDistance',
                            maxDistance: maxDistance,
                            query: queryFilter,
                        },
                    },
                    {
                        $project: {
                            mySetting: 0,
                            matchRequest: 0,
                            __v: 0,
                            geoLocation: 0,
                            reports: 0,
                        },
                    },
                    {
                        $sort: { maxDistance: 1 },
                    },
                    {
                        $skip: ((pagination === null || pagination === void 0 ? void 0 : pagination.page) - 1) * (pagination === null || pagination === void 0 ? void 0 : pagination.size) || 0,
                    },
                    {
                        $limit: (pagination === null || pagination === void 0 ? void 0 : pagination.size) || 100,
                    },
                ]),
                this.userModel.aggregate([
                    {
                        $geoNear: {
                            near: { type: 'Point', coordinates: [106.6510748, 10.7715686] },
                            spherical: true,
                            distanceField: 'calcDistance',
                            maxDistance: maxDistance,
                            query: queryFilter,
                        },
                    },
                ]),
            ]);
            return { results, totalCount: totalCount.length };
        }
        catch (error) {
            throw error;
        }
    }
    async signIn(input) {
        try {
            const user = await this.getOne({ email: input.email });
            (0, model_utils_1.throwIfNotExists)(user, 'Tài khoản không chính xác');
            if (!user.isConfirmMail) {
                throw new common_1.UnauthorizedException('Email chưa được xác nhận. Vui lòng xác nhận email của bạn');
            }
            if (user.isBlocked) {
                throw new common_1.UnauthorizedException('Tài khoản của bạn đã bị khóa. Vui lòng nạp tiền để mở khóa');
            }
            await this.isNotCorrectPassword(input.password, user.password);
            if (!user.isConfirmMail) {
                throw new common_1.UnauthorizedException('Tài khoản của bạn chưa được xác thực email. Vui lòng xác thực email để tiếp tục');
            }
            this.loggerService.debug('Passed password');
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    async signInAsAdmin(email, password) {
        try {
            const user = await this.userModel.findOne({ email });
            (0, model_utils_1.throwIfNotExists)(user, 'Admin không tồn tại');
            await this.isNotCorrectPassword(password, user.password);
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    async signUp(register) {
        try {
            if (register.password != register.confirmPassword) {
                throw new common_1.BadRequestException('Mật khẩu không khớp');
            }
            const { password, email } = register;
            const userExisting = await this.getOne({ email });
            if (userExisting) {
                throw new common_1.BadRequestException('Email đã tồn tại');
            }
            const [user, hashPassword] = await Promise.all([
                this.userModel.create({ email }),
                this.hashPassword(password),
            ]);
            user.password = hashPassword;
            return user.save();
        }
        catch (error) {
            throw error;
        }
    }
    async hashPassword(password) {
        try {
            const salt = await bcrypt_1.default.genSalt();
            const hashPassword = await bcrypt_1.default.hash(password, salt);
            return hashPassword;
        }
        catch (error) {
            throw error;
        }
    }
    async isNotCorrectPassword(password, currentPassword) {
        const correct = await bcrypt_1.default.compare(password, currentPassword);
        if (!correct) {
            throw new common_1.UnauthorizedException('Mật khẩu không chính xác');
        }
    }
    async findOneAndUpdate(filter, update) {
        try {
            const user = await this.userModel.findOneAndUpdate(filter, update, {
                new: true,
            });
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    async updateProfile(user, input, feature) {
        try {
            let updateQuery = {};
            if (feature === constants_1.Constants.CHANGE_SETTING) {
                updateQuery[feature] = input;
            }
            else {
                updateQuery = Object.assign({}, input);
            }
            const newUser = await this.userModel.findOneAndUpdate({ _id: user._id }, { $set: updateQuery }, { new: true });
            return (await newUser.save()) ? true : false;
        }
        catch (error) {
            throw error;
        }
    }
    async skipUser(user, user_id) {
        try {
            await this.userEmbeddedService.findOneAndUpdate({
                user: user._id,
                countUnlike: { $lt: constants_1.Constants.MAX_COUNT_IN_USER_EMBEDDED },
            }, {
                $push: { unlikeUser: user_id },
                $inc: { countUnlike: 1 },
                $set: { user: user._id },
            }, { upsert: true, new: true });
            return true;
        }
        catch (error) {
            throw error;
        }
    }
    async unSkipUser(user, user_id) {
        try {
            const user_embedded = await this.userEmbeddedService.getCurrentEmbedded(user._id);
            await this.userEmbeddedService.findOneAndUpdate({
                _id: user_embedded._id,
            }, { $pull: { unlikeUser: { $eq: user_id } }, $inc: { countUnlike: -1 } }, { new: true });
            return true;
        }
        catch (error) {
            throw error;
        }
    }
    async matchedUser(user, user_id, requestedUser) {
        this.loggerService.log('User match request with request user');
        const members = [user._id.toString(), requestedUser._id.toString()];
        const query = this.conversationService.getQueryOrMembers(members);
        await Promise.all([
            this.conversationService.findOneAndUpdate(query, { $set: { members: members, isDeleted: false } }, { upsert: true }),
            this.userModel.findOneAndUpdate({ _id: user._id }, {
                $pull: { matchRequest: { sender: user_id } },
                $push: { matched: requestedUser },
            }),
            requestedUser.matched.push(user),
        ]);
    }
    async likeUser(user_id, user) {
        try {
            const requestedUser = await this.userModel.findOne({ _id: user_id });
            const isContainsInRequest = (0, utils_1.includesInObject)(user.matchRequest, 'sender', '_id', user_id);
            if (isContainsInRequest) {
                const [, socketIds] = await Promise.all([
                    this.matchedUser(user, user_id, requestedUser),
                    this.cacheManager.get(constants_1.Constants.SOCKET + requestedUser._id.toString()),
                ]);
                this.chatGateway.sendEmit(socketIds, 'matchedUser', user);
            }
            else {
                this.loggerService.log(`Request match request to ${requestedUser.username}`);
                requestedUser.matchRequest.push({
                    sender: user,
                    createdAt: new Date(),
                });
                const [, socketIds] = await Promise.all([
                    this.userEmbeddedService.findOneAndUpdate({
                        user: user._id,
                        countLike: { $lt: constants_1.Constants.MAX_COUNT_IN_USER_EMBEDDED },
                    }, {
                        $push: { like: user_id },
                        $inc: { countLike: 1 },
                        $set: { user: user._id },
                    }, { upsert: true, new: true }),
                    this.cacheManager.get(constants_1.Constants.SOCKET + requestedUser._id.toString()),
                ]);
                this.chatGateway.sendEmit(socketIds, 'matchRequest', user);
            }
            await requestedUser.save();
            return true;
        }
        catch (error) {
            throw error;
        }
    }
    async unlikeUser(user, user_id) {
        const userUpdated = await this.userModel.findOneAndUpdate({ _id: user_id, matchRequest: { $elemMatch: { sender: user._id } } }, { $pull: { matchRequest: { sender: user._id } } });
        if (!userUpdated) {
            const members = [user._id.toString(), user_id];
            const query = this.conversationService.getQueryOrMembers(members);
            await Promise.all([
                this.userModel.findOneAndUpdate({ _id: user_id }, {
                    $pull: { matched: { $eq: user._id } },
                }),
                this.userModel.findOneAndUpdate({ _id: user._id }, {
                    $pull: { matched: { $eq: user_id } },
                    $push: { matchRequest: { sender: user_id, createdAt: new Date() } },
                }),
                this.conversationService.findOneAndUpdate(query, {
                    $set: { isDeleted: true },
                }),
            ]);
            return true;
        }
        return userUpdated ? true : false;
    }
    async unMatched(user, user_id) {
        try {
            const members = [user._id.toString(), user_id];
            const query = this.conversationService.getQueryOrMembers(members);
            await Promise.all([
                this.userModel.findOneAndUpdate({ _id: user_id }, { $pull: { matched: user._id } }),
                this.userModel.findOneAndUpdate({ _id: user._id }, { $pull: { matched: user_id } }),
                this.conversationService.findOneAndUpdate(query, {
                    $set: { isDeleted: false },
                }),
            ]);
            return true;
        }
        catch (error) {
            throw error;
        }
    }
    async reportUser(reasonReport, descriptionReport, userReport, reportBy) {
        try {
            const user = await this.userModel.findOneAndUpdate({ _id: userReport }, { $push: { reports: { reportBy, reasonReport, descriptionReport } } });
            (0, model_utils_1.throwIfNotExists)(user, 'Tài khoản không tồn tại');
            const user_embedded = await this.userEmbeddedService.findOneAndUpdate({ _id: reportBy._id }, { $push: { unlikeUser: userReport } }, { upsert: true, new: true });
            return user && user_embedded ? true : false;
        }
        catch (error) {
            throw error;
        }
    }
    async insertManyUser() {
        try {
            const usersL = await this.userModel.find();
            let count = 17;
            for (const user of usersL) {
                user.geoLocation = new user_entities_1.GeoLocation();
                user.geoLocation.coordinates = [106.7116815, 10.821203];
                await user.save();
                count++;
            }
            return true;
        }
        catch (error) {
            throw error;
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_entities_1.User.name)),
    __param(1, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => chat_gateway_1.ChatGateway))),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof cache_manager_1.Cache !== "undefined" && cache_manager_1.Cache) === "function" ? _a : Object, chat_gateway_1.ChatGateway,
        user_embedded_service_1.UserEmbeddedService,
        logger_service_1.LoggerService,
        conversation_service_1.ConversationService,
        user_helper_1.UserHelper])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map