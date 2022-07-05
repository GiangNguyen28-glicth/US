"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Constants = void 0;
const enum_1 = require("./enum");
class Constants {
    static generateSortOrder() {
        Constants.SortOrder[enum_1.FilterProduct.LATEST] = {
            property: '$natural',
            option: 1,
        };
        Constants.SortOrder[enum_1.FilterProduct.DECREASE_PRICE] = {
            property: 'price',
            option: -1,
        };
        Constants.SortOrder[enum_1.FilterProduct.INCREASE_PRICE] = {
            property: 'price',
            option: 1,
        };
        Constants.SortOrder[enum_1.FilterProduct.AZ] = {
            property: 'keyword',
            option: 'asc',
        };
        Constants.SortOrder[enum_1.FilterProduct.ZA] = {
            property: 'keyword',
            option: 'desc',
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
Constants.KEY_PRODUCT_BY_CATEGORY = 'keyproductbycategory';
Constants.CLOUDINARY = 'Cloudinary';
Constants.SortOrder = {};
//# sourceMappingURL=constants.js.map