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
const auth_service_1 = require("./auth.service");
const auth_resolver_1 = require("./auth.resolver");
const jwt_1 = require("@nestjs/jwt");
const jwt_rt_strategies_1 = require("./strategies/jwt-rt.strategies");
const jwt_at_strategies_1 = require("./strategies/jwt-at.strategies");
const user_module_1 = require("../modules/user/user.module");
const mail_service_1 = require("../modules/mail/mail.service");
const auth_controller_1 = require("./auth.controller");
const google_strategies_1 = require("./strategies/google.strategies");
const facebook_stategies_1 = require("./strategies/facebook.stategies");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [user_module_1.UserModule],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            auth_resolver_1.AuthResolver,
            jwt_1.JwtService,
            jwt_rt_strategies_1.RtStrategy,
            jwt_at_strategies_1.AtStrategy,
            mail_service_1.MailService,
            google_strategies_1.GoogleStrategy,
            facebook_stategies_1.FaceBookStrategy,
        ],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map