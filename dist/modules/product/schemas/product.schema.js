"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSchema = void 0;
const mongoose_1 = require("mongoose");
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
    categoryId: {
        type: String,
        ref: 'Category',
    },
    createAt: {
        type: Date,
        default: Date.now(),
    },
    updateAt: {
        type: Date,
    },
    slug: {
        type: String,
    },
    keyword: {
        type: String,
    },
});
//# sourceMappingURL=product.schema.js.map