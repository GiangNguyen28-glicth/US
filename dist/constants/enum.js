"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterStatistics = exports.SortProductEnum = exports.CategoryEnum = exports.RandomCodeEnum = exports.RoleEnum = exports.GenderEnum = void 0;
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
var SortProductEnum;
(function (SortProductEnum) {
    SortProductEnum["LATEST"] = "LATEST";
    SortProductEnum["BESTSELLER"] = "BESTSELLER";
    SortProductEnum["DECREASE_PRICE"] = "DECREASE_PRICE";
    SortProductEnum["INCREASE_PRICE"] = "INCREASE_PRICE";
    SortProductEnum["AZ"] = "AZ";
    SortProductEnum["ZA"] = "ZA";
})(SortProductEnum = exports.SortProductEnum || (exports.SortProductEnum = {}));
(0, graphql_1.registerEnumType)(SortProductEnum, {
    name: 'SortProductEnum',
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