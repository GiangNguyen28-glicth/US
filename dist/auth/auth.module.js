"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const role_guard_1 = require("../common/guards/role.guard");
const mail_module_1 = require("../modules/mail/mail.module");
const user_module_1 = require("../modules/user/user.module");
const auth_resolver_1 = require("./auth.resolver");
const auth_service_1 = require("./auth.service");
const jwt_at_strategies_1 = require("./strategies/jwt-at.strategies");
const jwt_rt_strategies_1 = require("./strategies/jwt-rt.strategies");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [user_module_1.UserModule, mail_module_1.MailModule],
        providers: [
            auth_resolver_1.AuthResolver,
            auth_service_1.AuthService,
            jwt_at_strategies_1.AtStrategy,
            jwt_rt_strategies_1.RtStrategy,
            role_guard_1.RolesGuard,
            jwt_1.JwtService,
        ],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map