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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const feature_utils_1 = require("../../utils/feature.utils");
const user_entities_1 = require("./entities/user.entities");
const bcrypt = require("bcrypt");
const enum_1 = require("../../constants/enum");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async getOne(filter) {
        let query;
        if (filter === null || filter === void 0 ? void 0 : filter.custom) {
            query = (0, feature_utils_1.getFieldsInFilter)(filter);
        }
        query = filter;
        const user = await this.userModel.findOne(query).exec();
        if (!user) {
            return undefined;
        }
        return user;
    }
    async signUp(input) {
        const password = input.password;
        const user = new this.userModel(input);
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);
        user.role = enum_1.RoleEnum.USER;
        user.password = hashPassword;
        await user.save();
        return user;
    }
    async markEmailAsConfirmed(email) {
        return this.userModel.findOneAndUpdate({ email: email }, {
            isEmailConfirmed: true,
            isExprise: null,
        });
    }
    async login(loginInput) {
        const { email, password } = loginInput;
        const user = await this.userModel.findOne({ email });
        if (!user || !(await this.isCorrectPassword(password, user))) {
            throw new common_1.HttpException('Tài khoản hoặc mật khẩu không chính xác', common_1.HttpStatus.UNAUTHORIZED);
        }
        if (!user.isEmailConfirmed) {
            throw new common_1.HttpException('Vui lòng xác thực tài khoản Email', common_1.HttpStatus.BAD_REQUEST);
        }
        return user;
    }
    async isCorrectPassword(password, user) {
        if (user && (await bcrypt.compare(password, user.password))) {
            return true;
        }
        return false;
    }
    async generateResetCode(user, randomString) {
        const userUpdate = new this.userModel(user);
        userUpdate.resetPasswordCode = await bcrypt.hash(randomString, 12);
        await userUpdate.save();
    }
    async verifyResetpassword(input) {
        const { code, userId, password, confirmpassword } = input;
        const user = await this.userModel.findOne({ _id: userId });
        if (!user) {
            throw new common_1.HttpException('User không tồn tại', common_1.HttpStatus.NOT_FOUND);
        }
        if (!user.isEmailConfirmed) {
            throw new common_1.HttpException('Email chưa được xác thực', common_1.HttpStatus.BAD_REQUEST);
        }
        if (!(await bcrypt.compare(code, user.resetPasswordCode))) {
            throw new common_1.HttpException('Code không chính xác', common_1.HttpStatus.BAD_REQUEST);
        }
        if (password != confirmpassword) {
            throw new common_1.HttpException('Mật khâu không khớp', common_1.HttpStatus.BAD_REQUEST);
        }
        user.resetPasswordCode = null;
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);
        user.password = hashPassword;
        await user.save();
        return true;
    }
    async updateUser(input, _id) {
        const user = await this.userModel.findOne({ _id });
        if (!user) {
            throw new common_1.HttpException('User không tồn tại', common_1.HttpStatus.BAD_REQUEST);
        }
        (0, feature_utils_1.setInputForOldDocument)(input, user);
        const userFolder = new this.userModel(user);
        userFolder.updateAt = new Date();
        await userFolder.save();
        return userFolder;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_entities_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map