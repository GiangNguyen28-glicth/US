"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagType = exports.StatusActive = exports.LookingFor = exports.RegisterType = exports.MessageType = exports.SortOption = exports.FilterByDate = exports.RoleEnum = exports.GenderEnum = void 0;
const graphql_1 = require("@nestjs/graphql");
var GenderEnum;
(function (GenderEnum) {
    GenderEnum["MALE"] = "MALE";
    GenderEnum["FEMALE"] = "FEMALE";
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
var FilterByDate;
(function (FilterByDate) {
    FilterByDate["SEVEN_DAYS_AGO"] = "SEVEN_DAYS_AGO";
    FilterByDate["THIRTY_DAYS_AGO"] = "THIRTY_DAYS_AGO";
    FilterByDate["THIS_YEAR"] = "THIS_YEAR";
    FilterByDate["LAST_YEAR"] = "LAST_YEAR";
})(FilterByDate = exports.FilterByDate || (exports.FilterByDate = {}));
(0, graphql_1.registerEnumType)(FilterByDate, {
    name: 'FilterByDate',
});
var SortOption;
(function (SortOption) {
    SortOption["AZ"] = "AZ";
    SortOption["ZA"] = "ZA";
    SortOption["AGE"] = "AGE";
})(SortOption = exports.SortOption || (exports.SortOption = {}));
(0, graphql_1.registerEnumType)(SortOption, {
    name: 'SortOption',
});
var MessageType;
(function (MessageType) {
    MessageType["IMAGE"] = "Image";
    MessageType["TEXT"] = "Text";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
(0, graphql_1.registerEnumType)(MessageType, {
    name: 'MessageType',
});
var RegisterType;
(function (RegisterType) {
    RegisterType["GOOGLE"] = "Google";
    RegisterType["FACEBOOK"] = "Facebook";
    RegisterType["NORMAL"] = "Normal";
})(RegisterType = exports.RegisterType || (exports.RegisterType = {}));
(0, graphql_1.registerEnumType)(RegisterType, {
    name: 'RegisterType',
});
var LookingFor;
(function (LookingFor) {
    LookingFor["MEN"] = "Men";
    LookingFor["WOMEN"] = "Women";
    LookingFor["ALL"] = "All";
})(LookingFor = exports.LookingFor || (exports.LookingFor = {}));
(0, graphql_1.registerEnumType)(LookingFor, {
    name: 'LookingFor',
});
var StatusActive;
(function (StatusActive) {
    StatusActive["ONLINE"] = "Online";
    StatusActive["OFFLINE"] = "Offline";
})(StatusActive = exports.StatusActive || (exports.StatusActive = {}));
(0, graphql_1.registerEnumType)(StatusActive, {
    name: 'StatusActive',
});
var TagType;
(function (TagType) {
    TagType["PASSIONS"] = "Passions";
    TagType["LIFE_STYLE"] = "Life style";
    TagType["EDUCATION"] = "Education";
    TagType["PETS"] = "Pets";
    TagType["DIETARY_PREFERENCE"] = "Dietary Preference";
    TagType["PERSONALITY_TYPE"] = "Personality Type";
    TagType["ZODIAC"] = "Zodiac";
    TagType["SMOKE_QUESTION"] = "Smoke question";
})(TagType = exports.TagType || (exports.TagType = {}));
(0, graphql_1.registerEnumType)(TagType, {
    name: 'TagType',
});
//# sourceMappingURL=enum.js.map