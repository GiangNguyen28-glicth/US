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
exports.ReviewService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const product_service_1 = require("../product/product.service");
const review_entities_1 = require("./entities/review.entities");
const mongoose_3 = __importDefault(require("mongoose"));
let ReviewService = class ReviewService {
    constructor(productReviewModel, productService) {
        this.productReviewModel = productReviewModel;
        this.productService = productService;
    }
    async createReview(input, user) {
        try {
            if (!(await this.productService.checkProductExists(input.productId))) {
                throw new common_1.HttpException('Sản phẩm hiện không khả dụng', common_1.HttpStatus.NOT_FOUND);
            }
            await this.productReviewModel.create({
                product: input.productId,
                user: user._id,
                rating: input.rating,
            });
            const averageRating = await this.averageRating(input.productId);
            await this.productService.updateProduct(input.productId, {
                rating: averageRating,
            });
            return true;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async countReview(productId) {
        if (!(await this.productService.checkProductExists(productId))) {
            throw new common_1.HttpException('Sản phẩm hiện không khả dụng', common_1.HttpStatus.NOT_FOUND);
        }
        return this.productReviewModel.find({ product: productId }).count();
    }
    async updateReview(input, user) {
        try {
            const productReview = await this.productReviewModel.findOneAndUpdate({
                product: input.productId,
                user: user._id,
            }, { rating: input.rating });
            const averageRating = await this.averageRating(input.productId);
            await this.productService.updateProduct(input.productId, {
                rating: averageRating,
            });
            return productReview ? true : false;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async checkExistsReview(productId, userId) {
        const review = await this.productReviewModel.findOne({
            product: productId,
            user: userId,
        });
        if (!review) {
            return false;
        }
        return true;
    }
    async averageRating(productId) {
        var _a;
        const totalrating = await this.productReviewModel.aggregate([
            {
                $match: {
                    product: new mongoose_3.default.Types.ObjectId(productId),
                },
            },
            {
                $group: {
                    _id: '$product',
                    sum: { $sum: '$rating' },
                    count: { $sum: 1 },
                },
            },
        ]);
        return ((_a = totalrating[0]) === null || _a === void 0 ? void 0 : _a.sum) ? totalrating[0].sum / totalrating[0].count : 0;
    }
};
ReviewService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(review_entities_1.ProductReview.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        product_service_1.ProductService])
], ReviewService);
exports.ReviewService = ReviewService;
//# sourceMappingURL=review.service.js.map