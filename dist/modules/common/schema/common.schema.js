"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ImageSchema = new mongoose_1.Schema({
    default: {
        type: String,
        trim: true,
    },
    small: {
        type: String,
        trim: true,
    },
    medium: {
        type: String,
        trim: true,
    },
    base64: {
        type: String,
        trim: true,
    },
    alt: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
}, { _id: false });
//# sourceMappingURL=common.schema.js.map