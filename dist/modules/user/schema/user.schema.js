"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
const enum_1 = require("../../../constants/enum");
exports.UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        trim: true,
    },
    phonenumber: {
        type: String,
        trim: true,
    },
    gender: {
        type: String,
        enum: Object.values(enum_1.GenderEnum),
    },
    address: {
        type: String,
        trim: true,
    },
    permission: {
        type: [String],
        enum: Object.values(enum_1.Permission),
    },
    role: {
        type: String,
        enum: Object.values(enum_1.RoleEnum),
    },
    isEmailConfirmed: {
        type: Boolean,
        default: false,
    },
    isExprise: {
        type: Date,
        default: Date.now(),
        expires: 60 * 60 * 5,
    },
    currentHashedRefreshToken: {
        type: String,
        trim: true,
    },
    keyword: {
        type: String,
        trim: true,
    },
    slug: {
        type: String,
        trim: true,
    },
    resetPasswordCode: {
        type: String,
        trim: true,
    },
    createAt: {
        type: Date,
        default: Date.now(),
    },
    updateAt: {
        type: Date,
    },
});
//# sourceMappingURL=user.schema.js.map