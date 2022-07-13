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
exports.ProductResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const graphql_scalars_1 = require("graphql-scalars");
const product_input_1 = require("./dto/product.input");
const product_entities_1 = require("./entities/product.entities");
const product_service_1 = require("./product.service");
let ProductResolver = class ProductResolver {
    constructor(productService) {
        this.productService = productService;
    }
    getProducts(input) {
        return this.productService.getProducts(input);
    }
    getProductByCategory(page, size, categoryId) {
        return this.productService.getProductByCategory(page, size, categoryId);
    }
    async resetCache() {
        await this.productService.resetCache();
        return 'Success';
    }
    searchProduct(input) {
        return this.productService.searchProduct(input);
    }
    getProductBySlug(slug) {
        return this.productService.getProductBySlug(slug);
    }
    createProduct(input) {
        return this.productService.createProduct(input);
    }
    updateProduct(input, productId) {
        return this.productService.updateProduct(productId, input);
    }
    fakeDataProduct() {
        return this.productService.updatePrice();
    }
};
__decorate([
    (0, graphql_1.Query)(() => product_entities_1.ResultFilter),
    __param(0, (0, graphql_1.Args)('option')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_input_1.OptionFilterProduct]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "getProducts", null);
__decorate([
    (0, graphql_1.Query)(() => product_entities_1.ResultFilter),
    __param(0, (0, graphql_1.Args)('page', { nullable: true })),
    __param(1, (0, graphql_1.Args)('size', { nullable: true })),
    __param(2, (0, graphql_1.Args)('categoryId', { type: () => graphql_scalars_1.ObjectIDResolver })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "getProductByCategory", null);
__decorate([
    (0, graphql_1.Query)(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "resetCache", null);
__decorate([
    (0, graphql_1.Query)(() => product_entities_1.ResultFilter),
    __param(0, (0, graphql_1.Args)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_input_1.SearchProductInput]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "searchProduct", null);
__decorate([
    (0, graphql_1.Query)(() => product_entities_1.Product),
    __param(0, (0, graphql_1.Args)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "getProductBySlug", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_input_1.CreateProductInput]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "createProduct", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, graphql_1.Args)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_input_1.UpdateProduct, String]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "updateProduct", null);
__decorate([
    (0, graphql_1.Query)(() => Boolean),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "fakeDataProduct", null);
ProductResolver = __decorate([
    (0, graphql_1.Resolver)(product_entities_1.Product.name),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductResolver);
exports.ProductResolver = ProductResolver;
//# sourceMappingURL=product.resolver.js.map