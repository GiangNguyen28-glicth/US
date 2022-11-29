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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserHelper = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const axios_1 = __importDefault(require("axios"));
const cloudinary_1 = require("cloudinary");
const constants_1 = require("../../../constants/constants");
const enum_1 = require("../../../constants/enum");
const filter_query_1 = require("../../../utils/filter.query");
const utils_1 = require("../../../utils/utils");
const logger_service_1 = require("../../logger/logger.service");
const user_embedded_service_1 = require("../../user_embedded/user_embedded.service");
const user_entities_1 = require("../entities/user.entities");
let UserHelper = class UserHelper {
    constructor(userModel, loggerService, userEmbeddedService) {
        this.userModel = userModel;
        this.loggerService = loggerService;
        this.userEmbeddedService = userEmbeddedService;
        this.CloudinaryProvider = {
            provide: constants_1.Constants.CLOUDINARY,
            useFactory: () => {
                return cloudinary_1.v2.config({
                    cloud_name: process.env.CLOUD_NAME,
                    api_key: process.env.API_KEY_CLOUD,
                    api_secret: process.env.API_SECRET_CLOUD,
                });
            },
        };
    }
    async buildQueryWithUser(user, filter) {
        const isApplyAge = user.mySetting.discovery.onlyShowAgeThisRange;
        const queryFilter = new filter_query_1.FilterBuilder()
            .setFilterItem('matched', { $in: filter === null || filter === void 0 ? void 0 : filter.matched }, filter === null || filter === void 0 ? void 0 : filter.matched)
            .setFilterItem('statusActive', { $eq: filter === null || filter === void 0 ? void 0 : filter.statusActive }, filter === null || filter === void 0 ? void 0 : filter.statusActive)
            .setFilterItem('isFirstLogin', { $eq: false }, 'true')
            .setFilterItem('showMeTinder', { $eq: user.showMeTinder }, user.showMeTinder);
        if (isApplyAge) {
            queryFilter.setFilterItem('age', {
                $gte: user.mySetting.discovery.minAge,
                $lte: user.mySetting.discovery.maxAge,
            }, user.mySetting.discovery.minAge);
        }
        const [user_ids_notLike, user_ids_liked] = await Promise.all([
            this.userEmbeddedService.getAllIdsNotLike(user._id.toString()),
            this.userEmbeddedService.getAllIdsLiked(user._id.toString()),
        ]);
        user_ids_notLike.push(user._id);
        const user_ids = user_ids_notLike.concat(user_ids_liked);
        queryFilter.setFilterItem('_id', { $nin: user_ids }, user._id.toString());
        return queryFilter.buildQuery()[0];
    }
    async setNewInfoAfterLogin(user, coordinates) {
        try {
            const [location, userUpdated] = await Promise.all([
                axios_1.default.get(`https://location-api-mu.vercel.app/query?lat=${coordinates[1]}&lon=${coordinates[0]}`),
                this.userModel.findOneAndUpdate({ _id: user._id }, {
                    $set: {
                        statusActive: enum_1.StatusActive.ONLINE,
                        lastActive: Date.now(),
                        geoLocation: {
                            coordinates: [coordinates[0], coordinates[1]],
                        },
                    },
                }),
            ]);
            this.loggerService.debug(location.data);
            const { city, district, country } = this.handleResponseAddress(location);
            userUpdated.address = new user_entities_1.Address();
            userUpdated.address.city = city;
            userUpdated.address.district = district;
            userUpdated.address.country = country;
            return (await userUpdated.save()) ? true : false;
        }
        catch (error) {
            throw error;
        }
    }
    handleResponseAddress(location) {
        const state = location.data['locationDetail']['state'];
        const city_district = location.data['locationDetail']['city_district'];
        const county = location.data['locationDetail']['county'];
        let city = location.data['locationDetail']['city'];
        city = city ? city : state;
        const district = city_district ? city_district : county;
        this.loggerService.debug(`State: ${state},District: ${district},City: ${city}`);
        const country = location.data['locationDetail']['country'];
        return { district, city, country };
    }
    async getCurrentAddress(user) {
        const location = await axios_1.default.get(`https://location-api-mu.vercel.app/query?lat=${user.geoLocation.coordinates[1]}&lon=${user.geoLocation.coordinates[0]}`);
        return this.handleResponseAddress(location);
    }
    async confirmBlockUser(_id) {
        try {
            const user = await this.userModel.findOneAndUpdate({ _id }, { $set: { isBlocked: true } });
            return user ? true : false;
        }
        catch (error) {
            throw error;
        }
    }
    async declineBlockUser(_id) {
        try {
            const user = await this.userModel.findOneAndUpdate({ _id }, { $set: { reports: [] } });
            return user ? true : false;
        }
        catch (error) {
            throw error;
        }
    }
    async getAllReportedUser(pagination) {
        try {
            const query = {
                reports: { $exists: true, $ne: [] },
                isDeleted: false,
                isBlocked: false,
                role: enum_1.RoleEnum.USER,
            };
            const [queryFilter, querySort] = new filter_query_1.FilterBuilder()
                .addSubQuery(query)
                .setSortItem('username', 'asc')
                .buildQuery();
            const [results, totalCount] = await Promise.all([
                this.userModel
                    .find(queryFilter)
                    .skip(((pagination === null || pagination === void 0 ? void 0 : pagination.page) - 1) * (pagination === null || pagination === void 0 ? void 0 : pagination.size))
                    .limit(pagination === null || pagination === void 0 ? void 0 : pagination.size)
                    .populate('reports.reportBy')
                    .sort(querySort),
                this.userModel.countDocuments(queryFilter),
            ]);
            return { results, totalCount };
        }
        catch (error) {
            throw error;
        }
    }
    async statisticUser(pagination, filter) {
        try {
            const queryFilterByDate = (0, utils_1.setFilterByDate)(filter === null || filter === void 0 ? void 0 : filter.filterByDate);
            let filterInActive = null;
            if ((filter === null || filter === void 0 ? void 0 : filter.isInActive) === true) {
                const currentDate = new Date();
                currentDate.setMonth(currentDate.getMonth() - 1);
                filterInActive = {
                    $lte: currentDate,
                };
            }
            const [queryFilter, querySort] = new filter_query_1.FilterBuilder()
                .addName(filter === null || filter === void 0 ? void 0 : filter.username)
                .setFilterItemWithObject('createdAt', queryFilterByDate, queryFilterByDate)
                .setFilterItemWithObject('gender', filter === null || filter === void 0 ? void 0 : filter.gender, filter === null || filter === void 0 ? void 0 : filter.gender)
                .setFilterItemWithObject('lastActive', filterInActive, filterInActive)
                .addSortOption(filter === null || filter === void 0 ? void 0 : filter.sortOption)
                .buildQuery();
            const [results, totalCount] = await Promise.all([
                this.userModel
                    .find(queryFilter)
                    .skip(((pagination === null || pagination === void 0 ? void 0 : pagination.page) - 1) * (pagination === null || pagination === void 0 ? void 0 : pagination.size))
                    .limit(pagination === null || pagination === void 0 ? void 0 : pagination.size)
                    .sort(querySort),
                this.userModel.countDocuments(queryFilter),
            ]);
            return { results, totalCount };
        }
        catch (error) {
            throw error;
        }
    }
    async calUserPercent() {
        try {
            let [currentMonth, lastMonth, startMonth] = [
                new Date(),
                new Date(),
                new Date(),
            ];
            lastMonth.setMonth(currentMonth.getMonth() - 1);
            lastMonth.setDate(1);
            startMonth.setDate(1);
            lastMonth = (0, utils_1.setStartDate)(lastMonth);
            startMonth = (0, utils_1.setStartDate)(startMonth);
            const lastDate = (0, utils_1.setLastDate)(startMonth);
            const [totalUserLastMoth, totalUserThisMonth] = await Promise.all([
                this.userModel.find({
                    createdAt: { $gte: lastMonth, $lte: lastDate },
                }),
                this.userModel.find({
                    createdAt: { $gte: startMonth, $lte: currentMonth },
                }),
            ]);
            if (totalUserLastMoth.length === 0) {
                return totalUserThisMonth.length;
            }
            return +(totalUserThisMonth.length / totalUserLastMoth.length).toFixed(2);
        }
        catch (error) {
            throw error;
        }
    }
    async uploadImage({ stream }) {
        try {
            return new Promise((resolve, reject) => {
                const streamLoad = cloudinary_1.v2.uploader.upload_stream(function (error, result) {
                    if (result) {
                        const resultUrl = result.secure_url;
                        resolve(resultUrl);
                    }
                    else {
                        reject(error);
                    }
                });
                stream.pipe(streamLoad);
            });
        }
        catch (err) {
            throw new common_1.BadRequestException(`Failed to upload profile picture ! Err:${err.message}`);
        }
    }
    async removeUpload(imageUrl) {
        try {
            const imageName = imageUrl.split('/');
            const result = await cloudinary_1.v2.uploader.destroy(imageName[imageName.length - 1].split('.')[0], function (error, result) {
                if (result) {
                    return result;
                }
                else {
                    throw error;
                }
            });
            if (result['result'] === 'not found') {
                throw new common_1.BadRequestException('Xóa file thất bại');
            }
            return result ? true : false;
        }
        catch (error) {
            throw error;
        }
    }
};
UserHelper = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_entities_1.User.name)),
    __metadata("design:paramtypes", [Object, logger_service_1.LoggerService,
        user_embedded_service_1.UserEmbeddedService])
], UserHelper);
exports.UserHelper = UserHelper;
//# sourceMappingURL=user.helper.js.map