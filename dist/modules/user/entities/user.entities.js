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
var User_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResult = exports.MatchRequest = exports.Reports = exports.User = exports.Address = exports.MySetting = exports.ControlWhoYouSee = exports.ControlWhoSeesYou = exports.DiscoverySettings = exports.GeoLocation = void 0;
const graphql_1 = require("@nestjs/graphql");
const enum_1 = require("../../../constants/enum");
const tag_entity_1 = require("../../tag/entities/tag.entity");
let GeoLocation = class GeoLocation {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], GeoLocation.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(() => [graphql_1.Float], { nullable: true, description: '[lng, lat]' }),
    __metadata("design:type", Array)
], GeoLocation.prototype, "coordinates", void 0);
GeoLocation = __decorate([
    (0, graphql_1.ObjectType)()
], GeoLocation);
exports.GeoLocation = GeoLocation;
let DiscoverySettings = class DiscoverySettings {
};
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], DiscoverySettings.prototype, "minAge", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], DiscoverySettings.prototype, "maxAge", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], DiscoverySettings.prototype, "onlyShowAgeThisRange", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], DiscoverySettings.prototype, "distance", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], DiscoverySettings.prototype, "onlyShowDistanceThisRange", void 0);
__decorate([
    (0, graphql_1.Field)(() => enum_1.LookingFor),
    __metadata("design:type", String)
], DiscoverySettings.prototype, "lookingFor", void 0);
DiscoverySettings = __decorate([
    (0, graphql_1.ObjectType)()
], DiscoverySettings);
exports.DiscoverySettings = DiscoverySettings;
let ControlWhoSeesYou = class ControlWhoSeesYou {
};
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], ControlWhoSeesYou.prototype, "standard", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], ControlWhoSeesYou.prototype, "onlyPeopleIveLiked", void 0);
ControlWhoSeesYou = __decorate([
    (0, graphql_1.ObjectType)()
], ControlWhoSeesYou);
exports.ControlWhoSeesYou = ControlWhoSeesYou;
let ControlWhoYouSee = class ControlWhoYouSee {
};
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], ControlWhoYouSee.prototype, "balancedRecommendations", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], ControlWhoYouSee.prototype, "recentlyActive", void 0);
ControlWhoYouSee = __decorate([
    (0, graphql_1.ObjectType)()
], ControlWhoYouSee);
exports.ControlWhoYouSee = ControlWhoYouSee;
let MySetting = class MySetting {
};
__decorate([
    (0, graphql_1.Field)(() => DiscoverySettings),
    __metadata("design:type", DiscoverySettings)
], MySetting.prototype, "discovery", void 0);
__decorate([
    (0, graphql_1.Field)(() => ControlWhoSeesYou),
    __metadata("design:type", ControlWhoSeesYou)
], MySetting.prototype, "controlWhoSeesYou", void 0);
__decorate([
    (0, graphql_1.Field)(() => ControlWhoYouSee),
    __metadata("design:type", ControlWhoYouSee)
], MySetting.prototype, "controlWhoYouSee", void 0);
MySetting = __decorate([
    (0, graphql_1.ObjectType)()
], MySetting);
exports.MySetting = MySetting;
let Address = class Address {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Address.prototype, "district", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Address.prototype, "city", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Address.prototype, "country", void 0);
Address = __decorate([
    (0, graphql_1.ObjectType)()
], Address);
exports.Address = Address;
let User = User_1 = class User {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], User.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, graphql_1.Field)(() => enum_1.GenderEnum, { nullable: true }),
    __metadata("design:type", String)
], User.prototype, "gender", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
__decorate([
    (0, graphql_1.HideField)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, graphql_1.Field)(() => Address, { nullable: true }),
    __metadata("design:type", Address)
], User.prototype, "address", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "birthDays", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number, { nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "age", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "images", void 0);
__decorate([
    (0, graphql_1.Field)(() => GeoLocation, { nullable: true }),
    __metadata("design:type", GeoLocation)
], User.prototype, "geoLocation", void 0);
__decorate([
    (0, graphql_1.Field)(() => [User_1], { nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "matched", void 0);
__decorate([
    (0, graphql_1.Field)(() => [tag_entity_1.Tag], { nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "tags", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], User.prototype, "showMeTinder", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "lastActive", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number, { nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "calcDistance", void 0);
__decorate([
    (0, graphql_1.Field)(() => enum_1.StatusActive, { nullable: true }),
    __metadata("design:type", String)
], User.prototype, "statusActive", void 0);
__decorate([
    (0, graphql_1.Field)(() => MySetting, { nullable: true }),
    __metadata("design:type", MySetting)
], User.prototype, "mySetting", void 0);
__decorate([
    (0, graphql_1.Field)(() => [MatchRequest], { nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "matchRequest", void 0);
__decorate([
    (0, graphql_1.Field)(() => [Reports], { nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "reports", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "liveAt", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "jobTitle", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "school", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "company", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "aboutMe", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], User.prototype, "isDeleted", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], User.prototype, "isFirstLogin", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "slug", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "keyword", void 0);
__decorate([
    (0, graphql_1.HideField)(),
    __metadata("design:type", Boolean)
], User.prototype, "isBlocked", void 0);
__decorate([
    (0, graphql_1.HideField)(),
    __metadata("design:type", Boolean)
], User.prototype, "isConfirmMail", void 0);
__decorate([
    (0, graphql_1.HideField)(),
    __metadata("design:type", String)
], User.prototype, "registerType", void 0);
__decorate([
    (0, graphql_1.HideField)(),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
User = User_1 = __decorate([
    (0, graphql_1.ObjectType)()
], User);
exports.User = User;
let Reports = class Reports {
};
__decorate([
    (0, graphql_1.Field)(() => User),
    __metadata("design:type", User)
], Reports.prototype, "reportBy", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], Reports.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Reports.prototype, "reasonReport", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Reports.prototype, "descriptionReport", void 0);
Reports = __decorate([
    (0, graphql_1.ObjectType)()
], Reports);
exports.Reports = Reports;
let MatchRequest = class MatchRequest {
};
__decorate([
    (0, graphql_1.Field)(() => User, { nullable: true }),
    __metadata("design:type", Object)
], MatchRequest.prototype, "sender", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    __metadata("design:type", Date)
], MatchRequest.prototype, "createdAt", void 0);
MatchRequest = __decorate([
    (0, graphql_1.ObjectType)()
], MatchRequest);
exports.MatchRequest = MatchRequest;
let UserResult = class UserResult {
};
__decorate([
    (0, graphql_1.Field)(() => [User], { nullable: true }),
    __metadata("design:type", Array)
], UserResult.prototype, "results", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number, { nullable: true }),
    __metadata("design:type", Number)
], UserResult.prototype, "totalCount", void 0);
UserResult = __decorate([
    (0, graphql_1.ObjectType)()
], UserResult);
exports.UserResult = UserResult;
//# sourceMappingURL=user.entities.js.map