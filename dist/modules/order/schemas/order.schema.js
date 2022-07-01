"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSchema = void 0;
const mongoose_1 = require("mongoose");
exports.OrderSchema = new mongoose_1.Schema({
    name: {
        type: String,
        trim: true,
    },
    slug: {
        type: String,
        trim: true,
    },
    keyword: {
        type: String,
        trim: true,
    },
}, {
    timestamps: true,
});
//# sourceMappingURL=order.schema.js.map