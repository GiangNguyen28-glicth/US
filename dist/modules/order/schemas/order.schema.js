"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSchema = void 0;
const mongoose_1 = require("mongoose");
const user_entities_1 = require("../../user/entities/user.entities");
exports.OrderSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: user_entities_1.User.name,
    },
    address: {
        type: String,
        trim: true,
    },
    totalQuantity: {
        type: Number,
    },
    totalPrice: {
        type: Number,
    },
}, {
    timestamps: true,
});
//# sourceMappingURL=order.schema.js.map