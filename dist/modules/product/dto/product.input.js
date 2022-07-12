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
exports.OptionFilterProduct = exports.SearchProductInput = exports.FilterProduct = exports.BasePagenation = exports.SortProductInput = exports.UpdateProduct = exports.CreateProductInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const graphql_scalars_1 = require("graphql-scalars");
const enum_1 = require("../../../constants/enum");
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
let UpdateProduct = class UpdateProduct {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateProduct.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], UpdateProduct.prototype, "price", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], UpdateProduct.prototype, "rating", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], UpdateProduct.prototype, "quantity", void 0);
UpdateProduct = __decorate([
    (0, graphql_1.InputType)()
], UpdateProduct);
exports.UpdateProduct = UpdateProduct;
let SortProductInput = class SortProductInput {
};
__decorate([
    (0, graphql_1.Field)(() => enum_1.SortProductEnum, { nullable: true }),
    __metadata("design:type", String)
], SortProductInput.prototype, "filterby", void 0);
SortProductInput = __decorate([
    (0, graphql_1.InputType)()
], SortProductInput);
exports.SortProductInput = SortProductInput;
let BasePagenation = class BasePagenation {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], BasePagenation.prototype, "page", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], BasePagenation.prototype, "size", void 0);
BasePagenation = __decorate([
    (0, graphql_1.InputType)()
], BasePagenation);
exports.BasePagenation = BasePagenation;
let FilterProduct = class FilterProduct {
    constructor() {
        this.minPrice = 0;
    }
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], FilterProduct.prototype, "minPrice", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], FilterProduct.prototype, "maxPrice", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], FilterProduct.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], FilterProduct.prototype, "isDiscount", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_scalars_1.ObjectIDResolver, { nullable: true }),
    __metadata("design:type", String)
], FilterProduct.prototype, "productId", void 0);
FilterProduct = __decorate([
    (0, graphql_1.InputType)()
], FilterProduct);
exports.FilterProduct = FilterProduct;
let SearchProductInput = class SearchProductInput extends BasePagenation {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], SearchProductInput.prototype, "name", void 0);
SearchProductInput = __decorate([
    (0, graphql_1.InputType)()
], SearchProductInput);
exports.SearchProductInput = SearchProductInput;
let OptionFilterProduct = class OptionFilterProduct extends BasePagenation {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", FilterProduct)
], OptionFilterProduct.prototype, "filter", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], OptionFilterProduct.prototype, "sort", void 0);
OptionFilterProduct = __decorate([
    (0, graphql_1.InputType)()
], OptionFilterProduct);
exports.OptionFilterProduct = OptionFilterProduct;
//# sourceMappingURL=product.input.js.map