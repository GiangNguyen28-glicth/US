"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartSchema = void 0;
const mongoose_1 = require("mongoose");
const feature_utils_1 = require("../../../utils/feature.utils");
const lineitem_schema_1 = require("./lineitem.schema");
exports.CartSchema = new mongoose_1.Schema({
    listItem: [lineitem_schema_1.LineItemSchema],
    totalPrice: {
        type: mongoose_1.Schema.Types.Decimal128,
        get: feature_utils_1.convertDecimal128ToString,
    },
}, { timestamps: true });
//# sourceMappingURL=cart.schema.js.map