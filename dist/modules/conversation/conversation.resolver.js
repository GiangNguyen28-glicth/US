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
exports.ConversationResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const getuser_decorators_1 = require("../../common/decorators/getuser.decorators");
const at_guard_1 = require("../../common/guard/at.guard");
const common_dto_1 = require("../common/dto/common.dto");
const user_entities_1 = require("../user/entities/user.entities");
const conversation_service_1 = require("./conversation.service");
const create_conversation_input_1 = require("./dto/create-conversation.input");
const conversation_entity_1 = require("./entities/conversation.entity");
let ConversationResolver = class ConversationResolver {
    constructor(conversationService) {
        this.conversationService = conversationService;
    }
    createConversation(input) {
        return this.conversationService.create(input);
    }
    getAllConversation(pagination, user) {
        return this.conversationService.findAll(pagination, user);
    }
    getAllUserMatched(user, pagination, isMessaged) {
        return this.conversationService.getAllUserMatched(pagination, user, isMessaged);
    }
    getOneConversation(input) {
        return this.conversationService.findOne(input);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => conversation_entity_1.Conversation),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_conversation_input_1.CreateConversationInput]),
    __metadata("design:returntype", void 0)
], ConversationResolver.prototype, "createConversation", null);
__decorate([
    (0, common_1.UseGuards)(at_guard_1.AtGuard),
    (0, graphql_1.Query)(() => conversation_entity_1.ConversationResult),
    __param(0, (0, graphql_1.Args)('pagination', { type: () => common_dto_1.PaginationInput, nullable: true })),
    __param(1, (0, getuser_decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_dto_1.PaginationInput,
        user_entities_1.User]),
    __metadata("design:returntype", Promise)
], ConversationResolver.prototype, "getAllConversation", null);
__decorate([
    (0, common_1.UseGuards)(at_guard_1.AtGuard),
    (0, graphql_1.Query)(() => conversation_entity_1.ConversationResult),
    __param(0, (0, getuser_decorators_1.GetUser)()),
    __param(1, (0, graphql_1.Args)('pagination', { type: () => common_dto_1.PaginationInput, nullable: true })),
    __param(2, (0, graphql_1.Args)('isMessaged', { type: () => Boolean, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entities_1.User,
        common_dto_1.PaginationInput, Boolean]),
    __metadata("design:returntype", Promise)
], ConversationResolver.prototype, "getAllUserMatched", null);
__decorate([
    (0, graphql_1.Query)(() => conversation_entity_1.Conversation),
    __param(0, (0, graphql_1.Args)('input', { type: () => create_conversation_input_1.FilterGetOneConversation, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_conversation_input_1.FilterGetOneConversation]),
    __metadata("design:returntype", void 0)
], ConversationResolver.prototype, "getOneConversation", null);
ConversationResolver = __decorate([
    (0, graphql_1.Resolver)(() => conversation_entity_1.Conversation),
    __metadata("design:paramtypes", [conversation_service_1.ConversationService])
], ConversationResolver);
exports.ConversationResolver = ConversationResolver;
//# sourceMappingURL=conversation.resolver.js.map