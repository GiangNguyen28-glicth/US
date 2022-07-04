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
exports.ReviewResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const getuser_decorator_1 = require("../../common/decorators/getuser.decorator");
const at_guard_1 = require("../../common/guards/at.guard");
const user_entities_1 = require("../user/entities/user.entities");
const review_input_1 = require("./dto/review.input");
const review_entities_1 = require("./entities/review.entities");
const review_service_1 = require("./review.service");
const error_utils_1 = require("../../utils/error.utils");
let ReviewResolver = class ReviewResolver {
    constructor(reviewService) {
        this.reviewService = reviewService;
    }
    async checkExistsReview(productId, user) {
        return this.reviewService.checkExistsReview(productId, user._id);
    }
    async countReview(productId) {
        return this.reviewService.countReview(productId);
    }
    async averageRating(productId) {
        const [data, error] = await (0, error_utils_1.handleRequest)(this.reviewService.averageRating(productId));
        return data;
    }
    async createReview(reviewInput, user) {
        return this.reviewService.createReview(reviewInput, user);
    }
    async updateReview(input, user) {
        return this.reviewService.updateReview(input, user);
    }
};
__decorate([
    (0, graphql_1.Query)(() => Boolean),
    (0, common_1.UseGuards)(at_guard_1.AtGuard),
    __param(0, (0, graphql_1.Args)('productId')),
    __param(1, (0, getuser_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entities_1.User]),
    __metadata("design:returntype", Promise)
], ReviewResolver.prototype, "checkExistsReview", null);
__decorate([
    (0, graphql_1.Query)(() => Number),
    __param(0, (0, graphql_1.Args)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReviewResolver.prototype, "countReview", null);
__decorate([
    (0, graphql_1.Query)(() => Number),
    __param(0, (0, graphql_1.Args)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReviewResolver.prototype, "averageRating", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, common_1.UseGuards)(at_guard_1.AtGuard),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, getuser_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [review_input_1.ReviewInput,
        user_entities_1.User]),
    __metadata("design:returntype", Promise)
], ReviewResolver.prototype, "createReview", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, common_1.UseGuards)(at_guard_1.AtGuard),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, getuser_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [review_input_1.ReviewInput,
        user_entities_1.User]),
    __metadata("design:returntype", Promise)
], ReviewResolver.prototype, "updateReview", null);
ReviewResolver = __decorate([
    (0, graphql_1.Resolver)(review_entities_1.ProductReview.name),
    __metadata("design:paramtypes", [review_service_1.ReviewService])
], ReviewResolver);
exports.ReviewResolver = ReviewResolver;
//# sourceMappingURL=review.resolver.js.map