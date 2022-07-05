"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSchema = void 0;
const mongoose_1 = require("mongoose");
const category_entities_1 = require("../../category/entites/category.entities");
exports.ProductSchema = new mongoose_1.Schema({
    name: {
        type: String,
        trim: true,
    },
    price: {
        type: mongoose_1.Schema.Types.Decimal128,
        min: [0, 'min is 0'],
        get: function (val) {
            if (val) {
                return +val.toString();
            }
            return 0;
        },
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
    quantity: {
        type: Number,
    },
    imgUrl: [],
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: category_entities_1.Category.name,
        autopopulate: true,
    },
    slug: {
        type: String,
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