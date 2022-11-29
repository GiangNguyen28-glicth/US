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
exports.MessageResult = exports.Message = void 0;
const graphql_1 = require("@nestjs/graphql");
const enum_1 = require("../../../constants/enum");
const conversation_entity_1 = require("../../conversation/entities/conversation.entity");
const user_entities_1 = require("../../user/entities/user.entities");
let Message = class Message {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], Message.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Message.prototype, "text", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_entities_1.User),
    __metadata("design:type", user_entities_1.User)
], Message.prototype, "sender", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_entities_1.User),
    __metadata("design:type", user_entities_1.User)
], Message.prototype, "receiver", void 0);
__decorate([
    (0, graphql_1.Field)(() => conversation_entity_1.Conversation),
    __metadata("design:type", conversation_entity_1.Conversation)
], Message.prototype, "conversion_id", void 0);
__decorate([
    (0, graphql_1.Field)(() => enum_1.MessageType),
    __metadata("design:type", String)
], Message.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Message.prototype, "urlMessageImage", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], Message.prototype, "cursor", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], Message.prototype, "isDeleted", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], Message.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], Message.prototype, "updatedAt", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Message.prototype, "keyword", void 0);
Message = __decorate([
    (0, graphql_1.ObjectType)()
], Message);
exports.Message = Message;
let MessageResult = class MessageResult {
};
__decorate([
    (0, graphql_1.Field)(() => [Message], { nullable: true }),
    __metadata("design:type", Array)
], MessageResult.prototype, "results", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number, { nullable: true }),
    __metadata("design:type", Number)
], MessageResult.prototype, "totalCount", void 0);
MessageResult = __decorate([
    (0, graphql_1.ObjectType)()
], MessageResult);
exports.MessageResult = MessageResult;
//# sourceMappingURL=message.entity.js.map