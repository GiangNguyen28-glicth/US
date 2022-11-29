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
exports.TagResult = exports.Tag = void 0;
const graphql_1 = require("@nestjs/graphql");
const enum_1 = require("../../../constants/enum");
let Tag = class Tag {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], Tag.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Tag.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => enum_1.TagType, { nullable: true }),
    __metadata("design:type", String)
], Tag.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(() => enum_1.TagType, { nullable: true }),
    __metadata("design:type", String)
], Tag.prototype, "parentType", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Tag.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], Tag.prototype, "isDeleted", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], Tag.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], Tag.prototype, "updatedAt", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Tag.prototype, "slug", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Tag.prototype, "keyword", void 0);
Tag = __decorate([
    (0, graphql_1.ObjectType)()
], Tag);
exports.Tag = Tag;
let TagResult = class TagResult {
};
__decorate([
    (0, graphql_1.Field)(() => [Tag], { nullable: true }),
    __metadata("design:type", Array)
], TagResult.prototype, "results", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], TagResult.prototype, "totalCount", void 0);
TagResult = __decorate([
    (0, graphql_1.ObjectType)()
], TagResult);
exports.TagResult = TagResult;
//# sourceMappingURL=tag.entity.js.map