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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const websockets_1 = require("@nestjs/websockets");
const cache_manager_1 = require("cache-manager");
const getuser_decorators_1 = require("../../common/decorators/getuser.decorators");
const enum_1 = require("../../constants/enum");
const conversation_service_1 = require("../conversation/conversation.service");
const create_message_input_1 = require("../message/dto/create-message.input");
const message_service_1 = require("../message/message.service");
const user_entities_1 = require("../user/entities/user.entities");
const socket_io_1 = require("socket.io");
const exception_ws_1 = require("../../common/exception/exception.ws");
const ws_guard_1 = require("../../common/guard/ws.guard");
const constants_1 = require("../../constants/constants");
const logger_service_1 = require("../logger/logger.service");
const user_service_1 = require("../user/user.service");
const socket_service_1 = require("./socket.service");
let ChatGateway = class ChatGateway {
    constructor(userService, cacheManager, jwtService, loggerService, messageService, socketService, conversationService) {
        this.userService = userService;
        this.cacheManager = cacheManager;
        this.jwtService = jwtService;
        this.loggerService = loggerService;
        this.messageService = messageService;
        this.socketService = socketService;
        this.conversationService = conversationService;
        this.loggerService.setContext('ChatGateway');
    }
    async handleDisconnect(socket) {
        try {
            const userId = socket.userId;
            const socketKey = constants_1.Constants.SOCKET + userId;
            let socketIds = await this.cacheManager.get(socketKey);
            this.loggerService.log(`Socket IDS in array: ${socketIds}`);
            if (!socketIds) {
                return;
            }
            socketIds = socketIds.filter(socketId => {
                if (socketId != socket.id) {
                    return socketId;
                }
            });
            if (socketIds.length === 0) {
                await Promise.all([
                    this.cacheManager.del(constants_1.Constants.SOCKET + userId),
                    this.handleBroadcastDisconnection(userId),
                ]);
            }
            else {
                this.loggerService.log(`Socket IDS in array After: ${socketIds}`);
                await this.cacheManager.set(socketKey, socketIds, {
                    ttl: constants_1.Constants.SOCKET_ID_TTL,
                });
            }
        }
        catch (error) {
            throw error;
        }
    }
    async handleBroadcastDisconnection(userId) {
        const user = await this.userService.findOneAndUpdate({ _id: userId }, {
            $set: {
                lastActive: new Date(),
                statusActive: enum_1.StatusActive.OFFLINE,
            },
        });
        const socketIds = await this.socketService.getAllSocketIds(user);
        socketIds.forEach(item => {
            this.server.sockets.to(item).emit('userMatchedDisconnection', user);
        });
    }
    async handleConnection(socket, ...args) {
        console.log('Connection Done');
    }
    async verifyFirstConnection(socket, user) {
        try {
            let socketIds = [];
            if (socket.handshake.query && socket.handshake.query.token) {
                socket.userId = user._id.toString();
                const socketKey = constants_1.Constants.SOCKET + user._id.toString();
                socketIds = await this.cacheManager.get(socketKey);
                this.loggerService.debug(`Socket IDS in array: ${socketIds}`);
                if (socketIds) {
                    socketIds.push(socket.id);
                    this.loggerService.debug(`Socket IDS after push to array:${socketIds}`);
                }
                else {
                    this.loggerService.debug('Push socket id to array');
                    socketIds = [socket.id];
                }
                await this.cacheManager.set(socketKey, socketIds, {
                    ttl: constants_1.Constants.SOCKET_ID_TTL,
                });
                this.loggerService.log('==========================================================');
            }
            else {
                throw new common_1.UnauthorizedException('Who are you?');
            }
        }
        catch (error) {
            throw error;
        }
    }
    afterInit(server) {
        this.server = server;
    }
    async sendMessage(data, user) {
        try {
            data.sender = user._id.toString();
            const [message, socketIds] = await Promise.all([
                this.messageService.create(data),
                this.cacheManager.get(constants_1.Constants.SOCKET + user._id.toString()),
            ]);
            this.sendEmit(socketIds, 'receiverMessage', message);
            return message;
        }
        catch (error) {
            throw error;
        }
    }
    async userOnline(user) {
        try {
            const socketIds = await this.socketService.getAllSocketIds(user);
            socketIds.forEach(item => {
                this.server.sockets.to(item).emit('userMatchedConnection', user);
            });
        }
        catch (error) {
            throw error;
        }
    }
    handleHeartBeat(socket, data, user) {
        console.log('This is user', user);
        this.loggerService.debug(socket.id);
    }
    async getAllUserMatchedTabMessage(user) {
        try {
            const [socketIds, users] = await Promise.all([
                this.cacheManager.get(constants_1.Constants.SOCKET + user._id.toString()),
                this.conversationService.getAllUserMatched(null, user, true),
            ]);
            this.sendEmit(socketIds, 'listUserMatched_tabMessage', users);
        }
        catch (error) {
            throw error;
        }
    }
    async getAllUserMatchedTabMatched(user) {
        try {
            const [socketIds, users] = await Promise.all([
                this.cacheManager.get(constants_1.Constants.SOCKET + user._id.toString()),
                this.conversationService.getAllUserMatched(null, user, false),
            ]);
            this.sendEmit(socketIds, 'listUserMatched_tabMatched', users);
        }
        catch (error) {
            throw error;
        }
    }
    sendEmit(socketIds, event, data) {
        if (socketIds) {
            socketIds.forEach(item => {
                this.server.sockets.to(item).emit(event, data);
            });
        }
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleDisconnect", null);
__decorate([
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleConnection", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('verifyFirstConnection'),
    (0, common_1.UseGuards)(ws_guard_1.WsGuard),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, getuser_decorators_1.GetUserWS)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket,
        user_entities_1.User]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "verifyFirstConnection", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('sendMessage'),
    (0, common_1.UseGuards)(ws_guard_1.WsGuard),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, getuser_decorators_1.GetUserWS)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_message_input_1.CreateMessageInput,
        user_entities_1.User]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "sendMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('isOnline'),
    (0, common_1.UseGuards)(ws_guard_1.WsGuard),
    __param(0, (0, getuser_decorators_1.GetUserWS)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entities_1.User]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "userOnline", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('heartbeat'),
    (0, common_1.UseGuards)(ws_guard_1.WsGuard),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __param(2, (0, getuser_decorators_1.GetUserWS)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object, user_entities_1.User]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleHeartBeat", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('getAllUserMatched_tabMessage'),
    (0, common_1.UseGuards)(ws_guard_1.WsGuard),
    __param(0, (0, getuser_decorators_1.GetUserWS)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entities_1.User]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "getAllUserMatchedTabMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('getAllUserMatched_tabMatched'),
    (0, common_1.UseGuards)(ws_guard_1.WsGuard),
    __param(0, (0, getuser_decorators_1.GetUserWS)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entities_1.User]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "getAllUserMatchedTabMatched", null);
ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ transport: ['websocket'], allowEIO3: true, cors: '*' }),
    (0, common_1.UseFilters)(exception_ws_1.WebsocketExceptionsFilter),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __param(1, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [user_service_1.UserService, typeof (_a = typeof cache_manager_1.Cache !== "undefined" && cache_manager_1.Cache) === "function" ? _a : Object, jwt_1.JwtService,
        logger_service_1.LoggerService,
        message_service_1.MessageService,
        socket_service_1.SocketService,
        conversation_service_1.ConversationService])
], ChatGateway);
exports.ChatGateway = ChatGateway;
//# sourceMappingURL=chat.gateway.js.map