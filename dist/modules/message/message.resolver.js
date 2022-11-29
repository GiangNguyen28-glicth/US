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
exports.MessageResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const graphql_scalars_1 = require("graphql-scalars");
const create_message_input_1 = require("./dto/create-message.input");
const message_entity_1 = require("./entities/message.entity");
const message_service_1 = require("./message.service");
let MessageResolver = class MessageResolver {
    constructor(messageService) {
        this.messageService = messageService;
    }
    getAllMessage(filter, pagination) {
        return this.messageService.findAll(filter, pagination);
    }
    removeMessage(_id) {
        return this.messageService.remove(_id);
    }
};
__decorate([
    (0, graphql_1.Query)(() => message_entity_1.MessageResult),
    __param(0, (0, graphql_1.Args)('filter', { type: () => create_message_input_1.FilterGetAllMessage, nullable: true })),
    __param(1, (0, graphql_1.Args)('pagination', { type: () => create_message_input_1.PaginationMessageInput, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_message_input_1.FilterGetAllMessage,
        create_message_input_1.PaginationMessageInput]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "getAllMessage", null);
__decorate([
    (0, graphql_1.Mutation)(() => message_entity_1.Message),
    __param(0, (0, graphql_1.Args)('message_id', { type: () => graphql_scalars_1.GraphQLObjectID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "removeMessage", null);
MessageResolver = __decorate([
    (0, graphql_1.Resolver)(() => message_entity_1.Message),
    __metadata("design:paramtypes", [message_service_1.MessageService])
], MessageResolver);
exports.MessageResolver = MessageResolver;
//# sourceMappingURL=message.resolver.js.map