"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketModule = void 0;
const common_1 = require("@nestjs/common");
const socket_service_1 = require("./socket.service");
const chat_gateway_1 = require("./chat.gateway");
const user_module_1 = require("../user/user.module");
const jwt_1 = require("@nestjs/jwt");
const logger_module_1 = require("../logger/logger.module");
const ws_strategies_1 = require("../../auth/strategies/ws.strategies");
const message_module_1 = require("../message/message.module");
const conversation_module_1 = require("../conversation/conversation.module");
let SocketModule = class SocketModule {
};
SocketModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            logger_module_1.LoggerModule,
            message_module_1.MessageModule,
            conversation_module_1.ConversationModule,
        ],
        providers: [socket_service_1.SocketService, chat_gateway_1.ChatGateway, jwt_1.JwtService, ws_strategies_1.WsStrategy],
        exports: [chat_gateway_1.ChatGateway],
    })
], SocketModule);
exports.SocketModule = SocketModule;
//# sourceMappingURL=socket.module.js.map