"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItemSchema = void 0;
const mongoose_1 = require("mongoose");
exports.OrderItemSchema = new mongoose_1.Schema({
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Product',
    },
    order: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Order',
    },
    quantity: {
        type: Number,
    },
    totalPrice: {
        type: Number,
    },
}, {
    timestamps: true,
});
//# sourceMappingURL=orderitem.schema.js.map