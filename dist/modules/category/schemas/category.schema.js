"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategorySchema = void 0;
const mongoose_1 = require("mongoose");
const enum_1 = require("../../../constants/enum");
const category_entities_1 = require("../entites/category.entities");
exports.CategorySchema = new mongoose_1.Schema({
    code: {
        type: String,
        enum: Object.values(enum_1.CategoryEnum),
    },
    name: {
        type: String,
        trim: true,
    },
    level: {
        type: Number,
    },
    parent: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: category_entities_1.Category.name,
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