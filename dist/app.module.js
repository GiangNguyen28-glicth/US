"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const mongoose_1 = require("@nestjs/mongoose");
const cache_config_1 = require("./configs/cache.config");
const graphql_config_1 = require("./configs/graphql.config");
const throttler_config_1 = require("./configs/throttler.config");
const auth_module_1 = require("./auth/auth.module");
const throttler_1 = require("@nestjs/throttler");
const apollo_1 = require("@nestjs/apollo");
const core_1 = require("@nestjs/core");
const throttler_guard_1 = require("./common/guard/throttler.guard");
const user_module_1 = require("./modules/user/user.module");
const mail_module_1 = require("./modules/mail/mail.module");
const mongoose_config_1 = require("./configs/mongoose.config");
const conversation_module_1 = require("./modules/conversation/conversation.module");
const tag_module_1 = require("./modules/tag/tag.module");
const message_module_1 = require("./modules/message/message.module");
const logger_module_1 = require("./modules/logger/logger.module");
const socket_module_1 = require("./modules/socket/socket.module");
const user_embedded_module_1 = require("./modules/user_embedded/user_embedded.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            graphql_1.GraphQLModule.forRootAsync({
                driver: apollo_1.ApolloDriver,
                useClass: graphql_config_1.GraphqlService,
            }),
            mongoose_1.MongooseModule.forRootAsync({
                useClass: mongoose_config_1.MongooseConfigService,
            }),
            throttler_1.ThrottlerModule.forRootAsync({
                useClass: throttler_config_1.ThrottlerConfigService,
            }),
            common_1.CacheModule.registerAsync({
                isGlobal: true,
                useClass: cache_config_1.CacheConfigService,
            }),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            mail_module_1.MailModule,
            conversation_module_1.ConversationModule,
            tag_module_1.TagModule,
            message_module_1.MessageModule,
            logger_module_1.LoggerModule,
            socket_module_1.SocketModule,
            user_embedded_module_1.UserEmbeddedModule,
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_guard_1.GqlThrottlerGuard,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map