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
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
const mail_verify_1 = require("./templates/mail.verify");
const mail_resetpassword_1 = require("./templates/mail.resetpassword");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
let MailService = class MailService {
    constructor(jwtservice, userService) {
        this.jwtservice = jwtservice;
        this.userService = userService;
    }
    transporter() {
        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
    }
    async sendVerifyMail(user, urlConfirm) {
        return await this.transporter().sendMail({
            from: process.env.MAIL_USERNAME,
            to: user.email,
            subject: 'Verify Your Email',
            html: (0, mail_verify_1.verifyEmailTemplate)(user.username, urlConfirm),
        });
    }
    async generateToken(email) {
        const token = await this.jwtservice.sign({ email }, {
            secret: process.env.JWT_VERIFICATION_EMAIL_TOKEN_SECRET,
            expiresIn: parseInt(process.env.JWT_VERIFICATION_EXPIRATION_TIME),
        });
        return token;
    }
    async decodeConfirmationToken(token) {
        try {
            const payload = await this.jwtservice.verify(token, {
                secret: process.env.JWT_VERIFICATION_EMAIL_TOKEN_SECRET,
            });
            if (typeof payload === 'object' && 'email' in payload) {
                return payload.email;
            }
            throw new common_1.HttpException('Lỗi trong khi xác thực Email', common_1.HttpStatus.BAD_REQUEST);
        }
        catch (error) {
            if ((error === null || error === void 0 ? void 0 : error.name) === 'TokenExpiredError') {
                throw new common_1.HttpException('Url đã hết hạn', common_1.HttpStatus.BAD_GATEWAY);
            }
            throw new common_1.HttpException('Không thể xác thực token', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async confirmEmail(confirmEmailInput) {
        const { email, token } = confirmEmailInput;
        const user = await this.userService.getOne({ email });
        await this.decodeConfirmationToken(token);
        if (user.isEmailConfirmed) {
            throw new common_1.HttpException('Email đã được xác minh', common_1.HttpStatus.BAD_REQUEST);
        }
        await this.userService.markEmailAsConfirmed(email);
        return true;
    }
    async sendResetPasswordMail(randomCode, user) {
        return await this.transporter().sendMail({
            from: process.env.EMAIL_USERNAME,
            to: user.email,
            subject: 'Reset password',
            html: (0, mail_resetpassword_1.resetPasswordMailTemplate)(user.username, randomCode),
        });
    }
};
MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_service_1.UserService])
], MailService);
exports.MailService = MailService;
//# sourceMappingURL=mail.service.js.map