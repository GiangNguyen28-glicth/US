"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategorySchema = void 0;
const mongoose_1 = require("mongoose");
const enum_1 = require("../../../constants/enum");
exports.CategorySchema = new mongoose_1.Schema({
    code: {
        type: String,
        enum: Object.values(enum_1.CategoryEnum),
    },
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
});
//# sourceMappingURL=category.schema.js.map