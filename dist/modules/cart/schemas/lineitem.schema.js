"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineItemSchema = void 0;
const mongoose_1 = require("mongoose");
const product_entities_1 = require("../../product/entities/product.entities");
const ref_utils_1 = require("../../../utils/ref.utils");
exports.LineItemSchema = new mongoose_1.Schema({
    product: (0, ref_utils_1.ref)(product_entities_1.Product, {
        select: ['_id', 'name', 'price', 'originalPrice', 'quantity', 'imgUrl'],
    }),
    quantity: {
        type: Number,
    },
    totalPrice: {
        type: Number,
    },
});
//# sourceMappingURL=lineitem.schema.js.map