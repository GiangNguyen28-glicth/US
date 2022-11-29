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
exports.FilterGetOneConversation = exports.CreateConversationInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const graphql_scalars_1 = require("graphql-scalars");
let CreateConversationInput = class CreateConversationInput {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_scalars_1.GraphQLObjectID, { nullable: true }),
    __metadata("design:type", String)
], CreateConversationInput.prototype, "lastMessage", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_scalars_1.GraphQLObjectID, { nullable: true }),
    __metadata("design:type", String)
], CreateConversationInput.prototype, "messagePin", void 0);
__decorate([
    (0, graphql_1.Field)(() => [graphql_scalars_1.GraphQLObjectID], { nullable: true }),
    __metadata("design:type", Array)
], CreateConversationInput.prototype, "members", void 0);
CreateConversationInput = __decorate([
    (0, graphql_1.InputType)()
], CreateConversationInput);
exports.CreateConversationInput = CreateConversationInput;
let FilterGetOneConversation = class FilterGetOneConversation {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_scalars_1.GraphQLObjectID, { nullable: true }),
    __metadata("design:type", String)
], FilterGetOneConversation.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)(() => [graphql_scalars_1.GraphQLObjectID], { nullable: true }),
    __metadata("design:type", Array)
], FilterGetOneConversation.prototype, "members", void 0);
FilterGetOneConversation = __decorate([
    (0, graphql_1.InputType)()
], FilterGetOneConversation);
exports.FilterGetOneConversation = FilterGetOneConversation;
//# sourceMappingURL=create-conversation.input.js.map