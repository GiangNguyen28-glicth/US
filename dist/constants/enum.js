"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterStatistics = exports.FilterProduct = exports.CategoryEnum = exports.RandomCodeEnum = exports.RoleEnum = exports.GenderEnum = void 0;
const graphql_1 = require("@nestjs/graphql");
var GenderEnum;
(function (GenderEnum) {
    GenderEnum["MALE"] = "MALE";
    GenderEnum["FEMALE"] = "FEMALE";
    GenderEnum["LGBT"] = "LGBT";
})(GenderEnum = exports.GenderEnum || (exports.GenderEnum = {}));
(0, graphql_1.registerEnumType)(GenderEnum, {
    name: 'GenderEnum',
});
var RoleEnum;
(function (RoleEnum) {
    RoleEnum["USER"] = "USER";
    RoleEnum["ADMIN"] = "ADMIN";
})(RoleEnum = exports.RoleEnum || (exports.RoleEnum = {}));
(0, graphql_1.registerEnumType)(RoleEnum, {
    name: 'RoleEnum',
});
var RandomCodeEnum;
(function (RandomCodeEnum) {
    RandomCodeEnum["LOWER"] = "LOWER";
    RandomCodeEnum["UPPER"] = "UPPER";
    RandomCodeEnum["NUMBER"] = "NUMBER";
})(RandomCodeEnum = exports.RandomCodeEnum || (exports.RandomCodeEnum = {}));
(0, graphql_1.registerEnumType)(RandomCodeEnum, {
    name: 'RandomCodeEnum',
});
var CategoryEnum;
(function (CategoryEnum) {
    CategoryEnum["HOME"] = "HOME";
    CategoryEnum["SPORT"] = "SPORT";
})(CategoryEnum = exports.CategoryEnum || (exports.CategoryEnum = {}));
(0, graphql_1.registerEnumType)(CategoryEnum, {
    name: 'CategoryEnum',
});
var FilterProduct;
(function (FilterProduct) {
    FilterProduct["LATEST"] = "LATEST";
    FilterProduct["BESTSELLER"] = "BESTSELLER";
    FilterProduct["DECREASE_PRICE"] = "DECREASE_PRICE";
    FilterProduct["INCREASE_PRICE"] = "INCREASE_PRICE";
    FilterProduct["AZ"] = "AZ";
    FilterProduct["ZA"] = "ZA";
})(FilterProduct = exports.FilterProduct || (exports.FilterProduct = {}));
(0, graphql_1.registerEnumType)(FilterProduct, {
    name: 'FilterProduct',
});
var FilterStatistics;
(function (FilterStatistics) {
    FilterStatistics["SEVENDAYSAGO"] = "SEVENDAYSAGO";
    FilterStatistics["THIRTYDAYSAGO"] = "THIRTYDAYSAGO";
    FilterStatistics["THISYEAR"] = "THISYEAR";
    FilterStatistics["LASTYEAR"] = "LASTYEAR";
})(FilterStatistics = exports.FilterStatistics || (exports.FilterStatistics = {}));
(0, graphql_1.registerEnumType)(FilterStatistics, {
    name: 'FilterStatistics',
});
//# sourceMappingURL=enum.js.map