"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toformatPrice = exports.setInputForOldDocument = exports.isEmptyObject = exports.getQueryGetAll = exports.toKeyword = exports.isUndefinedOrNull = exports.getFieldsInFilter = void 0;
const common_1 = require("@nestjs/common");
const string_utils_1 = require("./string.utils");
function getFieldsInFilter(filter) {
    const fields = {};
    for (const key in filter) {
        if (!isUndefinedOrNull(key)) {
            if (Array.isArray(filter[key])) {
                fields[key] = { $in: filter[key] };
            }
            else {
                fields[key] = filter[key];
            }
        }
    }
    return fields;
}
exports.getFieldsInFilter = getFieldsInFilter;
function isUndefinedOrNull(val) {
    return val === undefined || val === null;
}
exports.isUndefinedOrNull = isUndefinedOrNull;
function toKeyword(text) {
    if (!text)
        return '';
    return text.replace(/-/g, ' ');
}
exports.toKeyword = toKeyword;
function getQueryGetAll(prop, searchInput) {
    const query = {
        $and: [
            {
                property: {
                    $regex: `${(0, string_utils_1.transformTextSearch)(searchInput)}`,
                    $options: 'i',
                },
            },
        ],
    };
    Object.defineProperty(query.$and[0], prop, Object.getOwnPropertyDescriptor(query.$and[0], 'property'));
    delete query.$and[0]['property'];
    return query;
}
exports.getQueryGetAll = getQueryGetAll;
function isEmptyObject(obj) {
    for (const key in obj) {
        return false;
    }
    return true;
}
exports.isEmptyObject = isEmptyObject;
function setInputForOldDocument(input, oldDoc) {
    if (!oldDoc) {
        throw new common_1.HttpException('Không tìm thấy Document', common_1.HttpStatus.NOT_FOUND);
    }
    for (const key in input) {
        if (!isUndefinedOrNull(input[key])) {
            oldDoc[key] = input[key];
        }
    }
}
exports.setInputForOldDocument = setInputForOldDocument;
function toformatPrice(price) {
    return price.toString();
}
exports.toformatPrice = toformatPrice;
//# sourceMappingURL=feature.utils.js.map