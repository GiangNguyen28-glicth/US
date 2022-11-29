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
exports.FilterGetAllTag = exports.CreateTagInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const graphql_scalars_1 = require("graphql-scalars");
const enum_1 = require("../../../constants/enum");
let CreateTagInput = class CreateTagInput {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateTagInput.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => enum_1.TagType),
    __metadata("design:type", String)
], CreateTagInput.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(() => enum_1.TagType, { nullable: true }),
    __metadata("design:type", String)
], CreateTagInput.prototype, "parentType", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateTagInput.prototype, "description", void 0);
CreateTagInput = __decorate([
    (0, graphql_1.InputType)()
], CreateTagInput);
exports.CreateTagInput = CreateTagInput;
let FilterGetAllTag = class FilterGetAllTag {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], FilterGetAllTag.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => enum_1.TagType, { nullable: true }),
    __metadata("design:type", String)
], FilterGetAllTag.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(() => enum_1.TagType, { nullable: true }),
    __metadata("design:type", String)
], FilterGetAllTag.prototype, "parentType", void 0);
__decorate([
    (0, graphql_1.Field)(() => [graphql_scalars_1.GraphQLObjectID], { nullable: true }),
    __metadata("design:type", Array)
], FilterGetAllTag.prototype, "ids", void 0);
FilterGetAllTag = __decorate([
    (0, graphql_1.InputType)()
], FilterGetAllTag);
exports.FilterGetAllTag = FilterGetAllTag;
//# sourceMappingURL=create-tag.input.js.map