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
exports.SocketService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../constants/constants");
const message_service_1 = require("../message/message.service");
const redis_utils_1 = require("../../utils/redis.utils");
const cache_manager_1 = require("cache-manager");
let SocketService = class SocketService {
    constructor(messageService, cacheManager) {
        this.messageService = messageService;
        this.cacheManager = cacheManager;
    }
    getSocketKeyOfUser(user) {
        const socketKey = [];
        for (const item of user.matched) {
            const key = constants_1.Constants.SOCKET + item._id;
            socketKey.push(key);
        }
        return socketKey;
    }
    async getAllSocketIds(user) {
        const socketKey = this.getSocketKeyOfUser(user);
        const socketIds = await (0, redis_utils_1.getValueWithSocketKey)(this.cacheManager, socketKey);
        return socketIds;
    }
    findAll() {
        return `This action returns all socket`;
    }
    findOne(id) {
        return `This action returns a #${id} socket`;
    }
    remove(id) {
        return `This action removes a #${id} socket`;
    }
};
SocketService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [message_service_1.MessageService, typeof (_a = typeof cache_manager_1.Cache !== "undefined" && cache_manager_1.Cache) === "function" ? _a : Object])
], SocketService);
exports.SocketService = SocketService;
//# sourceMappingURL=socket.service.js.map