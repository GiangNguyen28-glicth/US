"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = __importStar(require("nodemailer"));
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const cache_manager_1 = require("cache-manager");
const constants_1 = require("../../constants/constants");
let MailService = class MailService {
    constructor(jwtService, userService, cacheManager) {
        this.jwtService = jwtService;
        this.userService = userService;
        this.cacheManager = cacheManager;
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
    async sendMail(email, subject, html) {
        return await this.transporter().sendMail({
            from: process.env.MAIL_USERNAME,
            to: email,
            subject: subject,
            html: html,
        });
    }
    async generateToken(email) {
        const token = await this.jwtService.sign({ email }, {
            secret: process.env.JWT_VERIFICATION_EMAIL_TOKEN_SECRET,
            expiresIn: parseInt(process.env.JWT_VERIFICATION_EXPIRATION_TIME),
        });
        return token;
    }
    async decodeConfirmationToken(token) {
        try {
            const payload = await this.jwtService.verify(token, {
                secret: process.env.JWT_VERIFICATION_EMAIL_TOKEN_SECRET,
            });
            if (typeof payload === 'object' && 'email' in payload) {
                return payload.email;
            }
            throw new common_1.BadRequestException("Can't decode this token");
        }
        catch (error) {
            throw error;
        }
    }
    async confirmEmail(email, code) {
        const [user, cacheValue] = await Promise.all([
            this.userService.getOne({ email }),
            this.cacheManager.get(`${constants_1.Constants.VERIFY_ACCOUNT_CODE}_${email}`),
        ]);
        if (!user) {
            throw new common_1.UnauthorizedException("This token can't use with email");
        }
        if (user.isConfirmMail) {
            throw new common_1.BadRequestException('Email đã được xác thực');
        }
        if (cacheValue !== code) {
            throw new common_1.BadRequestException('Code hiện tại không còn khả dụng !');
        }
        await Promise.all([
            this.userService.findOneAndUpdate({ email }, { $set: { isConfirmMail: true } }),
            this.cacheManager.del(`${constants_1.Constants.VERIFY_ACCOUNT_CODE}_${email}`),
        ]);
        return true;
    }
};
MailService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_service_1.UserService, typeof (_a = typeof cache_manager_1.Cache !== "undefined" && cache_manager_1.Cache) === "function" ? _a : Object])
], MailService);
exports.MailService = MailService;
//# sourceMappingURL=mail.service.js.map