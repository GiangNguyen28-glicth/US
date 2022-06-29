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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const feature_utils_1 = require("../../utils/feature.utils");
const category_service_1 = require("../category/category.service");
const product_entities_1 = require("./entities/product.entities");
let ProductService = class ProductService {
    constructor(productModel, categoryService) {
        this.productModel = productModel;
        this.categoryService = categoryService;
    }
    async createProduct(input) {
        return this.productModel.create(input) ? true : false;
    }
    async getAllProducts() {
        return this.productModel.find();
    }
    async searchProduct(input) {
        const searchInput = (input === null || input === void 0 ? void 0 : input.name) ? input.name : '';
        delete input.name;
        const fields = (0, feature_utils_1.getFieldsInFilter)(input);
        const query = (0, feature_utils_1.getQueryGetAll)('keyword', searchInput, fields);
        const product = await this.productModel.find(query).exec();
        return product;
    }
    async getProductByCategory(categoryId) {
        const category = await this.categoryService.getOneCategory({
            _id: categoryId,
        });
        const listIdDescendants = await this.categoryService.getChildIdCategory(category._id.toString());
        let listProducts = [];
        console.log(listIdDescendants);
        for (let i = 0; i < listIdDescendants.length; i++) {
            const products = await this.productModel.find({
                category: listIdDescendants[i],
            });
            listProducts = listProducts.concat(products);
        }
        return listProducts;
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_entities_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        category_service_1.CategoryService])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map