"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Constants = void 0;
const enum_1 = require("./enum");
class Constants {
    static generateSortOrder() {
        Constants.SortOrder[enum_1.SortProductEnum.LATEST] = {
            property: '$natural',
            option: 1,
        };
        Constants.SortOrder[enum_1.SortProductEnum.DECREASE_PRICE] = {
            property: 'price',
            option: -1,
        };
        Constants.SortOrder[enum_1.SortProductEnum.INCREASE_PRICE] = {
            property: 'price',
            option: 1,
        };
        Constants.SortOrder[enum_1.SortProductEnum.AZ] = {
            property: 'keyword',
            option: 'asc',
        };
        Constants.SortOrder[enum_1.SortProductEnum.ZA] = {
            property: 'keyword',
            option: 'desc',
        };
    }
    static generateStatisticOrder() {
        const today = new Date();
        Constants.StatisticOrder[enum_1.FilterStatistics.SEVENDAYSAGO] = {
            year: 0,
            month: 0,
            date: 7,
        };
        Constants.StatisticOrder[enum_1.FilterStatistics.THIRTYDAYSAGO] = {
            year: 0,
            month: 0,
            date: 30,
        };
        Constants.StatisticOrder[enum_1.FilterStatistics.THISYEAR] = {
            year: 0,
            month: today.getMonth(),
            date: today.getDate() - 1,
        };
        Constants.StatisticOrder[enum_1.FilterStatistics.LASTYEAR] = {
            year: 1,
            month: today.getMonth(),
            date: today.getDate() - 1,
        };
    }
}
exports.Constants = Constants;
Constants.LOCALE_COUNTRY_CODE_ENG = 'en';
Constants.LOCALE_COUNTRY_CODE_VN = 'vi';
Constants.CATEGORY_LEVEL_1 = 1;
Constants.CATEGORY_LEVEL_2 = 2;
Constants.CATEGORY_LEVEL_3 = 3;
Constants.CATEGORY_MAX_LEVEL = 3;
Constants.MONTH_12 = 11;
Constants.MONTH_1 = 1;
Constants.DATE_1 = 1;
Constants.DATE_31 = 31;
Constants.KEY_PRODUCT_BY_CATEGORY = 'keyproductbycategory';
Constants.KEY_DASHBOARD_STATISTIC_ORDER = 'keydashboardstatisticorder';
Constants.CLOUDINARY = 'Cloudinary';
Constants.SortOrder = {};
Constants.StatisticOrder = {};
//# sourceMappingURL=constants.js.map