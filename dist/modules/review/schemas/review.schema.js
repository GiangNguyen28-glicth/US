"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductReviewSchema = void 0;
const mongoose_1 = require("mongoose");
const product_entities_1 = require("../../product/entities/product.entities");
exports.ProductReviewSchema = new mongoose_1.Schema({
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: product_entities_1.Product.name,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    rating: {
        max: [5, 'Không được đánh giá quá 5 sao'],
        type: Number,
    },
}, {
    timestamps: true,
});
//# sourceMappingURL=review.schema.js.map