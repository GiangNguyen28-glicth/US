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
exports.UserEmbedded = void 0;
const graphql_1 = require("@nestjs/graphql");
const graphql_scalars_1 = require("graphql-scalars");
const user_entities_1 = require("../../user/entities/user.entities");
let UserEmbedded = class UserEmbedded {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], UserEmbedded.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_entities_1.User),
    __metadata("design:type", user_entities_1.User)
], UserEmbedded.prototype, "user", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], UserEmbedded.prototype, "countUnlike", void 0);
__decorate([
    (0, graphql_1.Field)(() => [graphql_scalars_1.GraphQLObjectID], { nullable: true }),
    __metadata("design:type", Array)
], UserEmbedded.prototype, "unlikeUser", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], UserEmbedded.prototype, "countLike", void 0);
__decorate([
    (0, graphql_1.Field)(() => [graphql_scalars_1.GraphQLObjectID], { nullable: true }),
    __metadata("design:type", Array)
], UserEmbedded.prototype, "like", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], UserEmbedded.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], UserEmbedded.prototype, "updatedAt", void 0);
UserEmbedded = __decorate([
    (0, graphql_1.ObjectType)()
], UserEmbedded);
exports.UserEmbedded = UserEmbedded;
//# sourceMappingURL=user_embedded.entity.js.map