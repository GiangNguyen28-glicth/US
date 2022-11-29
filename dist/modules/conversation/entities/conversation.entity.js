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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationResult = exports.Conversation = void 0;
const graphql_1 = require("@nestjs/graphql");
const message_entity_1 = require("../../message/entities/message.entity");
const user_entities_1 = require("../../user/entities/user.entities");
let Conversation = class Conversation {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], Conversation.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)(() => message_entity_1.Message, { nullable: true }),
    __metadata("design:type", message_entity_1.Message)
], Conversation.prototype, "lastMessage", void 0);
__decorate([
    (0, graphql_1.Field)(() => message_entity_1.Message, { nullable: true }),
    __metadata("design:type", message_entity_1.Message)
], Conversation.prototype, "messagePin", void 0);
__decorate([
    (0, graphql_1.Field)(() => [user_entities_1.User]),
    __metadata("design:type", Array)
], Conversation.prototype, "members", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_entities_1.User),
    __metadata("design:type", user_entities_1.User)
], Conversation.prototype, "user", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], Conversation.prototype, "isDeleted", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], Conversation.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], Conversation.prototype, "updatedAt", void 0);
Conversation = __decorate([
    (0, graphql_1.ObjectType)()
], Conversation);
exports.Conversation = Conversation;
let ConversationResult = class ConversationResult {
};
__decorate([
    (0, graphql_1.Field)(() => [Conversation], { nullable: true }),
    __metadata("design:type", Array)
], ConversationResult.prototype, "results", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number, { nullable: true }),
    __metadata("design:type", Number)
], ConversationResult.prototype, "totalCount", void 0);
ConversationResult = __decorate([
    (0, graphql_1.ObjectType)()
], ConversationResult);
exports.ConversationResult = ConversationResult;
//# sourceMappingURL=conversation.entity.js.map