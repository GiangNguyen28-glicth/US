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
exports.AuthResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const getuser_decorators_1 = require("../common/decorators/getuser.decorators");
const refresh_token_decorators_1 = require("../common/decorators/refresh.token.decorators");
const at_guard_1 = require("../common/guard/at.guard");
const rt_guard_1 = require("../common/guard/rt.guard");
const user_entities_1 = require("../modules/user/entities/user.entities");
const auth_service_1 = require("./auth.service");
const auth_dto_1 = require("./dto/auth.dto");
const auth_entities_1 = require("./entities/auth.entities");
let AuthResolver = class AuthResolver {
    constructor(authService) {
        this.authService = authService;
    }
    refreshToken(rfPayload) {
        try {
            return this.authService.refreshToken(rfPayload);
        }
        catch (error) {
            throw error;
        }
    }
    async verifyTokenGoogle(token) {
        return this.authService.verifyTokenGoogle(token);
    }
    async verifyTokenFacebook(token) {
        return this.authService.verifyTokenFacebook(token);
    }
    forgotPassword(email) {
        try {
            return this.authService.forgotPassword(email);
        }
        catch (error) {
            throw error;
        }
    }
    resetPassword(input) {
        return this.authService.resetPassword(input);
    }
    signInAsAdmin(email, password) {
        return this.authService.signInAsAdmin(email, password);
    }
    deleteAccount(user) {
        return this.authService.deleteAccount(user);
    }
    confirmDeleteAccount(code, email) {
        return this.authService.confirmDeleteAccount(code, email);
    }
    signIn(input) {
        try {
            return this.authService.signIn(input);
        }
        catch (error) {
            throw error;
        }
    }
    signUp(input) {
        try {
            return this.authService.signUp(input);
        }
        catch (error) {
            throw error;
        }
    }
    changePassword(user, oldPassword, newPassword, confirmPassword) {
        return this.authService.changePassword(oldPassword, newPassword, confirmPassword, user);
    }
    resetCache() {
        try {
            return this.authService.resetCache();
        }
        catch (error) {
            throw error;
        }
    }
};
__decorate([
    (0, graphql_1.Query)(() => auth_entities_1.JwtPayload),
    (0, common_1.UseGuards)(rt_guard_1.RtGuard),
    __param(0, (0, refresh_token_decorators_1.GetCurrentRefreshToken)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_entities_1.RefreshPayload]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "refreshToken", null);
__decorate([
    (0, graphql_1.Query)(() => auth_entities_1.JwtPayload),
    __param(0, (0, graphql_1.Args)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "verifyTokenGoogle", null);
__decorate([
    (0, graphql_1.Query)(() => auth_entities_1.JwtPayload),
    __param(0, (0, graphql_1.Args)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "verifyTokenFacebook", null);
__decorate([
    (0, graphql_1.Query)(() => Boolean),
    __param(0, (0, graphql_1.Args)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "forgotPassword", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('input', { type: () => auth_dto_1.ResetPasswordInput })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.ResetPasswordInput]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "resetPassword", null);
__decorate([
    (0, graphql_1.Query)(() => auth_entities_1.JwtPayload),
    __param(0, (0, graphql_1.Args)('email')),
    __param(1, (0, graphql_1.Args)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "signInAsAdmin", null);
__decorate([
    (0, graphql_1.Query)(() => Boolean),
    (0, common_1.UseGuards)(at_guard_1.AtGuard),
    __param(0, (0, getuser_decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entities_1.User]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "deleteAccount", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('code', { type: () => Number })),
    __param(1, (0, graphql_1.Args)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "confirmDeleteAccount", null);
__decorate([
    (0, graphql_1.Mutation)(() => auth_entities_1.JwtPayload),
    __param(0, (0, graphql_1.Args)('input', { type: () => auth_dto_1.LoginInput })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.LoginInput]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "signIn", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('input', { type: () => auth_dto_1.RegisterInput })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.RegisterInput]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "signUp", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, common_1.UseGuards)(at_guard_1.AtGuard),
    __param(0, (0, getuser_decorators_1.GetUser)()),
    __param(1, (0, graphql_1.Args)('oldPassword')),
    __param(2, (0, graphql_1.Args)('newPassword')),
    __param(3, (0, graphql_1.Args)('confirmPassword')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entities_1.User, String, String, String]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "changePassword", null);
__decorate([
    (0, graphql_1.Query)(() => Boolean),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthResolver.prototype, "resetCache", null);
AuthResolver = __decorate([
    (0, graphql_1.Resolver)('Auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthResolver);
exports.AuthResolver = AuthResolver;
//# sourceMappingURL=auth.resolver.js.map