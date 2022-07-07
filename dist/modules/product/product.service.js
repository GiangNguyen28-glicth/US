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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const constants_1 = require("../../constants/constants");
const feature_utils_1 = require("../../utils/feature.utils");
const redis_utils_1 = require("../../utils/redis.utils");
const category_service_1 = require("../category/category.service");
const product_entities_1 = require("./entities/product.entities");
const cache_manager_1 = require("cache-manager");
const enum_1 = require("../../constants/enum");
const order_item_service_1 = require("../order-item/order-item.service");
let ProductService = class ProductService {
    constructor(productModel, cacheService, categoryService, orderItemService) {
        this.productModel = productModel;
        this.cacheService = cacheService;
        this.categoryService = categoryService;
        this.orderItemService = orderItemService;
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
        if (await (0, redis_utils_1.checkCacheStore)(this.cacheService, categoryId)) {
            return this.cacheService.get(categoryId);
        }
        const category = await this.categoryService.getOneCategory({
            _id: categoryId,
        });
        const listIdDescendants = await this.categoryService.getChildIdCategory(category._id.toString());
        let listProducts = [];
        for (let i = 0; i < listIdDescendants.length; i++) {
            const products = await this.productModel.find({
                category: listIdDescendants[i],
            });
            listProducts = listProducts.concat(products);
        }
        return listProducts;
    }
    async getProductById(productId) {
        const product = await this.productModel.findOne({ _id: productId });
        if (!product) {
            throw new common_1.HttpException('Không tìm thấy Product', common_1.HttpStatus.NOT_FOUND);
        }
        return product;
    }
    async checkProductExists(productId) {
        const product = await this.productModel.findOne({ _id: productId });
        if (!product) {
            return false;
        }
        return true;
    }
    async getQuantityOfProduct(productId) {
        const product = await this.getProductById(productId);
        return product.quantity;
    }
    async updateProduct(productId, input) {
        const product = await this.productModel.findOneAndUpdate({ _id: productId }, input);
        if (!product) {
            throw new common_1.HttpException('Product ID không đúng', common_1.HttpStatus.NOT_FOUND);
        }
        return true;
    }
    async sortProduct(input) {
        let products;
        if (input.filterby === enum_1.FilterProduct.BESTSELLER) {
            const listProductId = await this.orderItemService.getListProductIdInOrderItem();
            products = await this.productModel.find({ _id: { $in: listProductId } });
        }
        else {
            constants_1.Constants.generateSortOrder();
            const { property, option } = constants_1.Constants.SortOrder[input.filterby];
            const query = {};
            query[property] = option;
            products = await this.productModel.find().sort(query);
        }
        return products;
    }
    async getProductByRangePrice(price) {
        const products = await this.productModel.find({ price: { $lte: price } });
        return products;
    }
    async resetCache() {
        await this.cacheService.reset();
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_entities_1.Product.name)),
    __param(1, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [mongoose_2.Model, typeof (_a = typeof cache_manager_1.Cache !== "undefined" && cache_manager_1.Cache) === "function" ? _a : Object, category_service_1.CategoryService,
        order_item_service_1.OrderItemService])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map