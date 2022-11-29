"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformTextSearch = exports.toKeyword = exports.toSlug = void 0;
const slugify_1 = __importDefault(require("slugify"));
const constants_1 = require("../constants/constants");
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