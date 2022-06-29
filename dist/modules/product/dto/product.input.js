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
exports.SearchProductInput = exports.CreateProductInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const graphql_scalars_1 = require("graphql-scalars");
let CreateProductInput = class CreateProductInput {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateProductInput.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], CreateProductInput.prototype, "price", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateProductInput.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], CreateProductInput.prototype, "discount", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], CreateProductInput.prototype, "quantity", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], CreateProductInput.prototype, "imgUrl", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_scalars_1.ObjectIDResolver),
    __metadata("design:type", String)
], CreateProductInput.prototype, "category", void 0);
CreateProductInput = __decorate([
    (0, graphql_1.InputType)()
], CreateProductInput);
exports.CreateProductInput = CreateProductInput;
let SearchProductInput = class SearchProductInput {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_scalars_1.ObjectIDResolver, { nullable: true }),
    __metadata("design:type", String)
], SearchProductInput.prototype, "category", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], SearchProductInput.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], SearchProductInput.prototype, "price", void 0);
SearchProductInput = __decorate([
    (0, graphql_1.InputType)()
], SearchProductInput);
exports.SearchProductInput = SearchProductInput;
//# sourceMappingURL=product.input.js.map