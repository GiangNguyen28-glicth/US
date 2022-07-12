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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mail_service_1 = require("../modules/mail/mail.service");
const user_service_1 = require("../modules/user/user.service");
const string_utils_1 = require("../utils/string.utils");
const auth_entities_1 = require("./entities/auth.entities");
let AuthService = class AuthService {
    constructor(userService, emailService, jwtService) {
        this.userService = userService;
        this.emailService = emailService;
        this.jwtService = jwtService;
    }
    async signUp(input) {
        if (input.password != input.confirmpassword) {
            throw new common_1.HttpException('Mật khẩu không khớp', common_1.HttpStatus.BAD_REQUEST);
        }
        const filter = { email: input.email };
        const userExisting = await this.userService.getOne(filter);
        if (userExisting) {
            throw new common_1.HttpException('Tài khoản đã tồn tại', common_1.HttpStatus.BAD_REQUEST);
        }
        const user = await this.userService.signUp(input);
        const token = await this.emailService.generateToken(user.email);
        const urlConfirm = `${process.env.FRONT_END_URL_CONFIRM_MAIL}?token=${token}`;
        return (await this.emailService.sendVerifyMail(user, urlConfirm))
            ? true
            : false;
    }
    async signIn(loginInput) {
        const user = await this.userService.login(loginInput);
        return await this.setJwt(user);
    }
    async setJwt(user) {
        const { _id, keyword } = user;
        const [at, rt] = await this.getTokens(_id, keyword);
        user.currentHashedRefreshToken = rt;
        await user.save();
        const jwtpayload = new auth_entities_1.JwtPayload();
        jwtpayload.accessToken = at;
        jwtpayload.refreshToken = rt;
        jwtpayload.payload = _id;
        jwtpayload.userInfo = user;
        return jwtpayload;
    }
    async getTokens(_id, keyword) {
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync({
                _id: _id,
                keyword,
            }, {
                secret: process.env.JWT_ACCESS_TOKEN_SECRET,
                expiresIn: parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME),
            }),
            this.jwtService.signAsync({
                _id: _id,
                keyword,
            }, {
                secret: process.env.JWT_REFRESH_TOKEN_SECRET,
                expiresIn: parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME),
            }),
        ]);
        return [at, rt];
    }
    async forgotPassword(email) {
        const user = await this.userService.getOne({ email });
        if (!user) {
            throw new common_1.HttpException('Email không tồn tại', common_1.HttpStatus.NOT_FOUND);
        }
        const randomString = (0, string_utils_1.randomCode)(20);
        await Promise.all([
            await this.userService.generateResetCode(user, randomString),
            await this.emailService.sendResetPasswordMail(randomString, user),
        ]);
        return true;
    }
    async resetPassword(input) {
        return this.userService.verifyResetpassword(input);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        mail_service_1.MailService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map