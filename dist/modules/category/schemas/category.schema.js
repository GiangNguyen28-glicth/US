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
        max: [3, 'Dept tối đa có thể là 3'],
        type: Number,
    },
    parent: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: category_entities_1.Category.name,
        autopopulate: true,
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
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
exports.CategorySchema.virtual('child', {
    ref: category_entities_1.Category.name,
    foreignField: 'parent',
    localField: '_id',
});
//# sourceMappingURL=category.schema.js.map