"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterStatisticUser = exports.NewInformationAfterLogin = exports.FilterGetAllUser = exports.FilterGetOneUser = exports.MySettingInput = exports.ControlWhoYouSeeInput = exports.ControlWhoSeesYouInput = exports.DiscoverySettingsInput = exports.UpdateUserInput = exports.GeoLocationInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const graphql_scalars_1 = require("graphql-scalars");
const enum_1 = require("../../../constants/enum");
let GeoLocationInput = class GeoLocationInput {
};
__decorate([
    (0, graphql_1.Field)(() => [graphql_1.Float], {
        description: 'Position 0 is Longitude , 1 is Latitude',
    }),
    __metadata("design:type", Array)
], GeoLocationInput.prototype, "coordinates", void 0);
GeoLocationInput = __decorate([
    (0, graphql_1.InputType)()
], GeoLocationInput);
exports.GeoLocationInput = GeoLocationInput;
let UpdateUserInput = class UpdateUserInput {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "username", void 0);
__decorate([
    (0, graphql_1.Field)(() => enum_1.GenderEnum, { nullable: true }),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "gender", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "phoneNumber", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    __metadata("design:type", Date)
], UpdateUserInput.prototype, "birthDays", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], UpdateUserInput.prototype, "images", void 0);
__decorate([
    (0, graphql_1.Field)(() => [graphql_scalars_1.GraphQLObjectID], { nullable: true }),
    __metadata("design:type", Array)
], UpdateUserInput.prototype, "tags", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], UpdateUserInput.prototype, "showMeTinder", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "liveAt", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "jobTitle", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "school", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "company", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "aboutMe", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], UpdateUserInput.prototype, "isFirstLogin", void 0);
UpdateUserInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateUserInput);
exports.UpdateUserInput = UpdateUserInput;
let DiscoverySettingsInput = class DiscoverySettingsInput {
};
__decorate([
    (0, graphql_1.Field)(() => Number, { nullable: true }),
    __metadata("design:type", Number)
], DiscoverySettingsInput.prototype, "minAge", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number, { nullable: true }),
    __metadata("design:type", Number)
], DiscoverySettingsInput.prototype, "maxAge", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], DiscoverySettingsInput.prototype, "onlyShowAgeThisRange", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number, { nullable: true }),
    __metadata("design:type", Number)
], DiscoverySettingsInput.prototype, "distance", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], DiscoverySettingsInput.prototype, "onlyShowDistanceThisRange", void 0);
__decorate([
    (0, graphql_1.Field)(() => enum_1.LookingFor, { nullable: true }),
    __metadata("design:type", String)
], DiscoverySettingsInput.prototype, "lookingFor", void 0);
DiscoverySettingsInput = __decorate([
    (0, graphql_1.InputType)()
], DiscoverySettingsInput);
exports.DiscoverySettingsInput = DiscoverySettingsInput;
let ControlWhoSeesYouInput = class ControlWhoSeesYouInput {
};
__decorate([
    (0, graphql_1.Field)(() => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], ControlWhoSeesYouInput.prototype, "standard", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], ControlWhoSeesYouInput.prototype, "onlyPeopleIveLiked", void 0);
ControlWhoSeesYouInput = __decorate([
    (0, graphql_1.InputType)()
], ControlWhoSeesYouInput);
exports.ControlWhoSeesYouInput = ControlWhoSeesYouInput;
let ControlWhoYouSeeInput = class ControlWhoYouSeeInput {
};
__decorate([
    (0, graphql_1.Field)(() => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], ControlWhoYouSeeInput.prototype, "balancedRecommendations", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], ControlWhoYouSeeInput.prototype, "recentlyActive", void 0);
ControlWhoYouSeeInput = __decorate([
    (0, graphql_1.InputType)()
], ControlWhoYouSeeInput);
exports.ControlWhoYouSeeInput = ControlWhoYouSeeInput;
let MySettingInput = class MySettingInput {
};
__decorate([
    (0, graphql_1.Field)(() => DiscoverySettingsInput, { nullable: true }),
    __metadata("design:type", DiscoverySettingsInput)
], MySettingInput.prototype, "discovery", void 0);
__decorate([
    (0, graphql_1.Field)(() => ControlWhoSeesYouInput, { nullable: true }),
    __metadata("design:type", ControlWhoSeesYouInput)
], MySettingInput.prototype, "controlWhoSeesYou", void 0);
__decorate([
    (0, graphql_1.Field)(() => ControlWhoYouSeeInput, { nullable: true }),
    __metadata("design:type", ControlWhoYouSeeInput)
], MySettingInput.prototype, "controlWhoYouSee", void 0);
MySettingInput = __decorate([
    (0, graphql_1.InputType)()
], MySettingInput);
exports.MySettingInput = MySettingInput;
let FilterGetOneUser = class FilterGetOneUser {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_scalars_1.GraphQLObjectID, { nullable: true }),
    __metadata("design:type", String)
], FilterGetOneUser.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], FilterGetOneUser.prototype, "slug", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], FilterGetOneUser.prototype, "email", void 0);
__decorate([
    (0, graphql_1.HideField)(),
    __metadata("design:type", String)
], FilterGetOneUser.prototype, "registerType", void 0);
__decorate([
    (0, graphql_1.HideField)(),
    __metadata("design:type", String)
], FilterGetOneUser.prototype, "resetPasswordCode", void 0);
FilterGetOneUser = __decorate([
    (0, graphql_1.InputType)()
], FilterGetOneUser);
exports.FilterGetOneUser = FilterGetOneUser;
let FilterGetAllUser = class FilterGetAllUser {
};
__decorate([
    (0, graphql_1.Field)(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], FilterGetAllUser.prototype, "matched", void 0);
__decorate([
    (0, graphql_1.Field)(() => enum_1.StatusActive, { nullable: true }),
    __metadata("design:type", String)
], FilterGetAllUser.prototype, "statusActive", void 0);
FilterGetAllUser = __decorate([
    (0, graphql_1.InputType)()
], FilterGetAllUser);
exports.FilterGetAllUser = FilterGetAllUser;
class NewInformationAfterLogin {
}
exports.NewInformationAfterLogin = NewInformationAfterLogin;
let FilterStatisticUser = class FilterStatisticUser {
};
__decorate([
    (0, graphql_1.Field)(() => enum_1.FilterByDate, { nullable: true }),
    __metadata("design:type", String)
], FilterStatisticUser.prototype, "filterByDate", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], FilterStatisticUser.prototype, "username", void 0);
__decorate([
    (0, graphql_1.Field)(() => enum_1.GenderEnum, { nullable: true }),
    __metadata("design:type", String)
], FilterStatisticUser.prototype, "gender", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], FilterStatisticUser.prototype, "isInActive", void 0);
__decorate([
    (0, graphql_1.Field)(() => enum_1.SortOption, { nullable: true }),
    __metadata("design:type", String)
], FilterStatisticUser.prototype, "sortOption", void 0);
FilterStatisticUser = __decorate([
    (0, graphql_1.InputType)()
], FilterStatisticUser);
exports.FilterStatisticUser = FilterStatisticUser;
//# sourceMappingURL=create-user.dto.js.map