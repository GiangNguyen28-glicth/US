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
const product_input_1 = require("./dto/product.input");
const product_entities_1 = require("./entities/product.entities");
const product_service_1 = require("./product.service");
let ProductResolver = class ProductResolver {
    constructor(productService) {
        this.productService = productService;
    }
    async getAllProducts() {
        return this.productService.getAllProducts();
    }
    async searchProduct(input) {
        return this.productService.searchProduct(input);
    }
    async getProductByCategory(categoryId) {
        return this.productService.getProductByCategory(categoryId);
    }
    async getProductById(productId) {
        return this.productService.getProductById(productId);
    }
    async resetCache() {
        this.productService.resetCache();
        return 'Success';
    }
    async createProduct(input) {
        return this.productService.createProduct(input);
    }
};
__decorate([
    (0, graphql_1.Query)(() => [product_entities_1.Product]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "getAllProducts", null);
__decorate([
    (0, graphql_1.Query)(() => [product_entities_1.Product]),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_input_1.SearchProductInput]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "searchProduct", null);
__decorate([
    (0, graphql_1.Query)(() => [product_entities_1.Product]),
    __param(0, (0, graphql_1.Args)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "getProductByCategory", null);
__decorate([
    (0, graphql_1.Query)(() => product_entities_1.Product),
    __param(0, (0, graphql_1.Args)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "getProductById", null);
__decorate([
    (0, graphql_1.Query)(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "resetCache", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_input_1.CreateProductInput]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "createProduct", null);
ProductResolver = __decorate([
    (0, graphql_1.Resolver)(product_entities_1.Product.name),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductResolver);
exports.ProductResolver = ProductResolver;
//# sourceMappingURL=product.resolver.js.map