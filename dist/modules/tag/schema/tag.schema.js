"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagSchema = void 0;
const mongoose_1 = require("mongoose");
const enum_1 = require("../../../constants/enum");
exports.TagSchema = new mongoose_1.Schema({
    name: { type: String, trim: true },
    type: { type: String, trim: true, enum: Object.values(enum_1.TagType) },
    parentType: { type: String, trim: true, enum: Object.values(enum_1.TagType) },
    description: { type: String, trim: true },
    slug: { type: String, trim: true },
    keyword: {
        type: String,
        trim: true,
    },
}, {
    timestamps: true,
});
//# sourceMappingURL=tag.schema.js.map