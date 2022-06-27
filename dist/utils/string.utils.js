"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformTextSearch = exports.toKeyword = exports.toSlug = exports.randomCode = void 0;
const slugify_1 = require("slugify");
const constants_1 = require("../constants/constants");
const enum_1 = require("../constants/enum");
function randomCode(length, option) {
    let alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (option && option === enum_1.RandomCodeEnum.LOWER) {
        alphabet = '0123456789abcdefghjklmnopqrstuvwxyz';
    }
    if (option && option === enum_1.RandomCodeEnum.NUMBER) {
        alphabet = '0123456789';
    }
    return alphabet;
}
exports.randomCode = randomCode;
function toSlug(text, locale) {
    if (!text)
        return '';
    text = text.replace('$', '').replace('%', '');
    if (!locale) {
        locale = constants_1.Constants.LOCALE_COUNTRY_CODE_ENG;
    }
    else {
        locale = constants_1.Constants.LOCALE_COUNTRY_CODE_VN;
    }
    return (0, slugify_1.default)(text, {
        replacement: '-',
        lower: true,
        strict: true,
        locale: locale,
        trim: true,
    });
}
exports.toSlug = toSlug;
function toKeyword(text) {
    if (!text)
        return '';
    return text.replace(/-/g, ' ');
}
exports.toKeyword = toKeyword;
function transformTextSearch(text) {
    if (!text)
        return '';
    text = text.replace('$', '').replace('%', '');
    text = (0, slugify_1.default)(text, {
        replacement: '-',
        lower: true,
        strict: true,
        trim: true,
    });
    return text.replace(/-/g, ' ');
}
exports.transformTextSearch = transformTextSearch;
//# sourceMappingURL=string.utils.js.map