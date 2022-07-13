"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSchema = void 0;
const mongoose_1 = require("mongoose");
const feature_utils_1 = require("../../../utils/feature.utils");
const ref_utils_1 = require("../../../utils/ref.utils");
const category_entities_1 = require("../../category/entites/category.entities");
exports.ProductSchema = new mongoose_1.Schema({
    name: {
        type: String,
        trim: true,
    },
    price: {
        type: mongoose_1.Schema.Types.Decimal128,
        min: [0, 'min is 0'],
        get: feature_utils_1.convertDecimal128ToString,
    },
    displayPrice: {
        type: String,
    },
    rating: {
        type: Number,
        default: 0,
    },
    title: {
        type: String,
        trim: true,
    },
    discount: {
        type: Number,
        default: 0,
    },
    originalPrice: {
        type: mongoose_1.Schema.Types.Decimal128,
        min: [0, 'min is 0'],
        get: feature_utils_1.convertDecimal128ToString,
    },
    quantity: {
        type: Number,
    },
    imgUrl: [],
    category: (0, ref_utils_1.ref)(category_entities_1.Category, { select: ['_id', 'name', '-parent'] }),
    slug: {
        type: String,
        unique: true,
    },
    keyword: {
        type: String,
    },
}, {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
});
//# sourceMappingURL=product.schema.js.map