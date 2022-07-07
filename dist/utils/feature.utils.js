"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setStartDate = exports.setLastDate = exports.statisticFormatDateToString = exports.toformatPrice = exports.setInputForOldDocument = exports.isEmptyObject = exports.getQueryGetAll = exports.toKeyword = exports.isUndefinedOrNull = exports.getFieldsInFilter = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../constants/constants");
const enum_1 = require("../constants/enum");
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
function getQueryGetAll(prop, searchInput, fields) {
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
    if (!isEmptyObject(fields)) {
        query.$and.push(fields);
    }
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
    const priceN = parseInt(price.toString());
    const priceVND = priceN.toLocaleString('it-IT', {
        style: 'currency',
        currency: 'VND',
    });
    return priceVND;
}
exports.toformatPrice = toformatPrice;
function statisticFormatDateToString(staticOption) {
    const { year, month, date } = constants_1.Constants.StatisticOrder[staticOption];
    const temp = new Date();
    let endDate = new Date(temp.getFullYear(), temp.getMonth(), temp.getDate(), 7);
    if (staticOption === enum_1.FilterStatistics.LASTYEAR) {
        endDate.setFullYear(temp.getFullYear() - 1);
        endDate.setMonth(constants_1.Constants.MONTH_12);
        endDate.setDate(constants_1.Constants.DATE_31);
    }
    const endOfDate = endDate.toISOString().substring(0, 10);
    const startDate = new Date(temp.getFullYear() - year, temp.getMonth() - month, temp.getDate() - date, 7);
    const startOfDate = startDate.toISOString().substring(0, 10);
    return [startOfDate, endOfDate];
}
exports.statisticFormatDateToString = statisticFormatDateToString;
function setLastDate(endOfDateConvert) {
    endOfDateConvert.setHours(23);
    endOfDateConvert.setMinutes(59);
    endOfDateConvert.setSeconds(59);
    endOfDateConvert.setMilliseconds(59);
    return endOfDateConvert;
}
exports.setLastDate = setLastDate;
function setStartDate(startOfDate) {
    startOfDate.setHours(0);
    startOfDate.setMinutes(0);
    startOfDate.setSeconds(0);
    startOfDate.setMilliseconds(0);
    return startOfDate;
}
exports.setStartDate = setStartDate;
//# sourceMappingURL=feature.utils.js.map