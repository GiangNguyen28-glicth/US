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
exports.CategoryGetOneInput = exports.CategoryInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const enum_1 = require("../../../constants/enum");
const graphql_scalars_1 = require("graphql-scalars");
let CategoryInput = class CategoryInput {
};
__decorate([
    (0, graphql_1.Field)(() => enum_1.CategoryEnum),
    __metadata("design:type", String)
], CategoryInput.prototype, "code", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CategoryInput.prototype, "name", void 0);
CategoryInput = __decorate([
    (0, graphql_1.InputType)()
], CategoryInput);
exports.CategoryInput = CategoryInput;
let CategoryGetOneInput = class CategoryGetOneInput {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_scalars_1.ObjectIDResolver),
    __metadata("design:type", String)
], CategoryGetOneInput.prototype, "_id", void 0);
CategoryGetOneInput = __decorate([
    (0, graphql_1.InputType)()
], CategoryGetOneInput);
exports.CategoryGetOneInput = CategoryGetOneInput;
//# sourceMappingURL=category.input.js.map