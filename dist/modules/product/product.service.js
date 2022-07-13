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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const constants_1 = require("../../constants/constants");
const category_service_1 = require("../category/category.service");
const product_entities_1 = require("./entities/product.entities");
const order_item_service_1 = require("../order-item/order-item.service");
const faker_1 = require("@faker-js/faker");
const concreteBuilder_1 = require("../../pattern/Builder/concreteBuilder");
const feature_utils_1 = require("../../utils/feature.utils");
const string_utils_1 = require("../../utils/string.utils");
const decimal_js_1 = __importDefault(require("decimal.js"));
const enum_1 = require("../../constants/enum");
let ProductService = class ProductService {
    constructor(productModel, categoryService, orderItemService) {
        this.productModel = productModel;
        this.categoryService = categoryService;
        this.orderItemService = orderItemService;
    }
    async createProduct(input) {
        return this.productModel.create(input) ? true : false;
    }
    async getProducts(input) {
        try {
            const [queryFilter, querySort] = new concreteBuilder_1.FilterProductBuilder()
                .addRangePrice(input.filter.minPrice, input.filter.maxPrice)
                .addDiscount(input.filter.isDiscount)
                .addProductId(input.filter.productId)
                .addSortOption(input.sort)
                .buildQuery();
            const skip = (0, feature_utils_1.getSkipValue)(input.page, input.size);
            const [products, listKeyword, totalCount] = await Promise.all([
                this.productModel
                    .find(queryFilter)
                    .skip(skip)
                    .limit(input === null || input === void 0 ? void 0 : input.size)
                    .sort(querySort),
                this.getKeyword(input.filter.name),
                this.getTotalCount(queryFilter),
            ]);
            return {
                results: products,
                listKeyword: listKeyword,
                totalCount: totalCount,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    getTotalCount(query) {
        return this.productModel.countDocuments(query).exec();
    }
    async getKeyword(name) {
        if (!name) {
            return [];
        }
        name = '^' + (0, string_utils_1.transformTextSearch)(name);
        const prouducts = await this.productModel.find({
            $and: [
                {
                    keyword: {
                        $regex: `${name}`,
                        $options: 'i',
                    },
                },
            ],
        }, { _id: 0, name: 1 });
        return prouducts.map(item => item.name);
    }
    async searchProduct(input) {
        try {
            const query = new concreteBuilder_1.FilterProductBuilder().addName(input.name).buildQuery();
            const skip = (0, feature_utils_1.getSkipValue)(input.page, input.size);
            const query2 = await this.sortProduct(enum_1.SortProductEnum.AZ);
            console.log(query2);
            const [products, totalCount, listKeyword] = await Promise.all([
                this.productModel
                    .find(query)
                    .skip(skip)
                    .limit(input === null || input === void 0 ? void 0 : input.size)
                    .sort(query2),
                this.getTotalCount(query),
                this.getKeyword(input.name),
            ]);
            return {
                results: products,
                totalCount: totalCount,
                listKeyword: listKeyword,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getProductByCategory(page, size, categoryId) {
        const category = await this.categoryService.getOneCategory({
            _id: categoryId,
        });
        let listIdDescendants = await this.categoryService.getChildIdCategory(category._id.toString());
        listIdDescendants = listIdDescendants.concat(categoryId);
        const skip = (0, feature_utils_1.getSkipValue)(page, size);
        const [products, totalCount] = await Promise.all([
            this.productModel
                .find({
                category: { $in: listIdDescendants },
            })
                .skip(skip)
                .limit(size),
            this.getTotalCount({
                category: { $in: listIdDescendants },
            }),
        ]);
        return {
            results: products,
            totalCount: totalCount,
        };
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
    async getProductBySlug(slug) {
        try {
            const product = await this.productModel.findOne({ slug: slug });
            return product;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async sortProduct(input) {
        let products;
        const query = {};
        if (input === enum_1.SortProductEnum.BESTSELLER) {
            const listProductId = await this.orderItemService.getListProductIdInOrderItem();
            products = await this.productModel.find({ _id: { $in: listProductId } });
        }
        else {
            constants_1.Constants.generateSortOrder();
            const { property, option } = constants_1.Constants.SortOrder[input];
            query[property] = option;
        }
        return query;
    }
    async updatePrice() {
        const products = await this.productModel.find();
        for (const i of products) {
            await this.productModel.findOneAndUpdate({ _id: i._id }, {
                $set: {
                    originalPrice: i.price,
                    price: new decimal_js_1.default((0, feature_utils_1.priceAfterDiscount)(i.price, i.discount)),
                },
            });
        }
        return true;
    }
    createRandomProduct() {
        const data = [
            {
                name: 'Bodysuit Ba Lỗ Sơ Sinh Bé Gái Trắng Hoạ Tiết Chấm Bi',
                discount: +faker_1.faker.commerce.price(0, 10),
                category: '62ba7663f002a7e575034d4d',
                quantity: faker_1.faker.datatype.number(20),
                title: faker_1.faker.commerce.productDescription(),
                price: 109000,
                imgUrl: [
                    'https://traffic-edge12.cdn.vncdn.io/nvn/ncdn/store1/58863/ps/20220509/bodysuit_ba_lo_so_sinh_be_gai_trang_hoa_tiet_cham_bi_baa_baby_1.jpg',
                ],
            },
            {
                name: faker_1.faker.commerce.product(),
                discount: +faker_1.faker.commerce.price(0, 10),
                category: '62ba7694f002a7e575034d5c',
                quantity: faker_1.faker.datatype.number(20),
                title: faker_1.faker.commerce.productDescription(),
                price: +faker_1.faker.commerce.price(10000, 100000),
                imgUrl: [faker_1.faker.image.cats()],
            },
        ];
        return {
            name: faker_1.faker.commerce.product(),
            discount: +faker_1.faker.commerce.price(0, 10),
            category: '62ba7694f002a7e575034d5c',
            quantity: faker_1.faker.datatype.number(20),
            title: faker_1.faker.commerce.productDescription(),
            price: +faker_1.faker.commerce.price(10000, 100000),
            imgUrl: [faker_1.faker.image.cats()],
        };
    }
    async fakeDataProduct() {
        for (let index = 0; index < 5; index++) {
            this.createProduct(this.createRandomProduct());
        }
        return true;
    }
    async resetCache() {
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_entities_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        category_service_1.CategoryService,
        order_item_service_1.OrderItemService])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map