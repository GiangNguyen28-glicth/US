"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const product_module_1 = require("../product/product.module");
const review_entities_1 = require("./entities/review.entities");
const review_resolver_1 = require("./review.resolver");
const review_service_1 = require("./review.service");
const review_schema_1 = require("./schemas/review.schema");
let ReviewModule = class ReviewModule {
};
ReviewModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeatureAsync([
                {
                    name: review_entities_1.ProductReview.name,
                    useFactory: () => {
                        review_schema_1.ProductReviewSchema.pre('save', function (next) {
                            return next();
                        });
                        return review_schema_1.ProductReviewSchema;
                    },
                },
            ]),
            product_module_1.ProductModule,
        ],
        providers: [review_resolver_1.ReviewResolver, review_service_1.ReviewService],
    })
], ReviewModule);
exports.ReviewModule = ReviewModule;
//# sourceMappingURL=review.module.js.map