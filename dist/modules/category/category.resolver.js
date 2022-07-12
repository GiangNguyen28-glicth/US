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
exports.CategoryResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const category_service_1 = require("./category.service");
const category_input_1 = require("./dto/category.input");
const category_entities_1 = require("./entites/category.entities");
let CategoryResolver = class CategoryResolver {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    getChildOfCategory(categoryId) {
        return this.categoryService.getChildOfCategory(categoryId);
    }
    getChildIdCategory(categoryId) {
        return this.categoryService.getChildIdCategory(categoryId);
    }
    getCategoryByParentIdAndLevel(input) {
        return this.categoryService.getCategoryByParentIdAndLevel(input);
    }
    getCategoryById(input) {
        return this.categoryService.getOneCategory(input);
    }
    createCategory(input) {
        return this.categoryService.createCategory(input);
    }
};
__decorate([
    (0, graphql_1.Query)(() => category_entities_1.Category),
    __param(0, (0, graphql_1.Args)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "getChildOfCategory", null);
__decorate([
    (0, graphql_1.Query)(() => [String]),
    __param(0, (0, graphql_1.Args)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "getChildIdCategory", null);
__decorate([
    (0, graphql_1.Query)(() => [category_entities_1.Category]),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_input_1.CategoryGetByParentAndLevel]),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "getCategoryByParentIdAndLevel", null);
__decorate([
    (0, graphql_1.Query)(() => category_entities_1.Category),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_input_1.CategoryGetOneInput]),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "getCategoryById", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_input_1.CategoryInput]),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "createCategory", null);
CategoryResolver = __decorate([
    (0, graphql_1.Resolver)(category_entities_1.Category.name),
    __metadata("design:paramtypes", [category_service_1.CategoryService])
], CategoryResolver);
exports.CategoryResolver = CategoryResolver;
//# sourceMappingURL=category.resolver.js.map