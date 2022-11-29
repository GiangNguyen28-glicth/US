"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = exports.ReportsSchema = exports.MySettingSchema = exports.AddressSchema = exports.ControlWhoYouSeeSchema = exports.ControlWhoSeesYouSchema = exports.DiscoverySettingsSchema = exports.MatchRequestSchema = exports.GeoLocationSchema = void 0;
const mongoose_1 = require("mongoose");
const enum_1 = require("../../../constants/enum");
const tag_entity_1 = require("../../tag/entities/tag.entity");
const user_entities_1 = require("../entities/user.entities");
exports.GeoLocationSchema = new mongoose_1.Schema({
    type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
    },
    coordinates: {
        type: [Number],
        required: true,
    },
}, { _id: false });
exports.MatchRequestSchema = new mongoose_1.Schema({
    sender: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: user_entities_1.User.name,
    },
    createdAt: { type: Date },
}, { _id: false });
exports.DiscoverySettingsSchema = new mongoose_1.Schema({
    maxAge: { type: Number, default: 35 },
    minAge: { type: Number, default: 18 },
    lookingFor: {
        type: String,
        enum: Object.values(enum_1.LookingFor),
        default: enum_1.LookingFor.ALL,
    },
    distance: { type: Number, default: 150 },
    onlyShowAgeThisRange: { type: Boolean, default: true },
    onlyShowDistanceThisRange: { type: Boolean, default: true },
}, { _id: false });
exports.ControlWhoSeesYouSchema = new mongoose_1.Schema({
    standard: { type: Boolean, default: true },
    onlyPeopleIveLiked: { type: Boolean, default: false },
}, { _id: false });
exports.ControlWhoYouSeeSchema = new mongoose_1.Schema({
    balancedRecommendations: { type: Boolean, default: true },
    recentlyActive: { type: Boolean, default: false },
}, { _id: false });
exports.AddressSchema = new mongoose_1.Schema({
    district: { type: String, trim: true },
    city: { type: String, trim: true },
    country: { type: String, trim: true },
}, { _id: false });
exports.MySettingSchema = new mongoose_1.Schema({
    discovery: {
        type: exports.DiscoverySettingsSchema,
        default: new user_entities_1.DiscoverySettings(),
    },
    controlWhoSeesYou: {
        type: exports.ControlWhoSeesYouSchema,
        default: new user_entities_1.ControlWhoSeesYou(),
    },
    controlWhoYouSee: {
        type: exports.ControlWhoYouSeeSchema,
        default: new user_entities_1.ControlWhoYouSee(),
    },
}, { _id: false });
exports.ReportsSchema = new mongoose_1.Schema({
    reportBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: user_entities_1.User.name,
        autopopulate: false,
    },
    createdAt: { type: Date, default: new Date() },
    reasonReport: { type: String, trim: true },
    descriptionReport: { type: String, trim: true },
}, { _id: false });
exports.UserSchema = new mongoose_1.Schema({
    username: { type: String, trim: true },
    email: { type: String, trim: true },
    password: { type: String, trim: true },
    address: { type: exports.AddressSchema, default: new user_entities_1.Address() },
    showMeTinder: { type: Boolean, default: true },
    jobTitle: { type: String, trim: true },
    school: { type: String, trim: true },
    aboutMe: { type: String, trim: true },
    company: { type: String, trim: true },
    age: { type: Number },
    gender: {
        type: String,
        trim: true,
        enum: Object.values(enum_1.GenderEnum),
        default: enum_1.GenderEnum.MALE,
    },
    phoneNumber: { type: String, trim: true },
    birthDays: { type: Date },
    images: { type: [String], default: [] },
    geoLocation: { type: exports.GeoLocationSchema },
    lastActive: { type: Date, default: new Date() },
    isDeleted: { type: Boolean, default: false },
    isFirstLogin: { type: Boolean, default: false },
    isConfirmMail: { type: Boolean, default: false },
    matchRequest: { type: [exports.MatchRequestSchema], default: [] },
    reports: [{ type: exports.ReportsSchema, default: [] }],
    matched: [{ type: mongoose_1.Schema.Types.ObjectId, ref: user_entities_1.User.name }],
    statusActive: { type: String, enum: Object.values(enum_1.StatusActive) },
    role: {
        type: String,
        enum: Object.values(enum_1.RoleEnum),
        default: enum_1.RoleEnum.USER,
    },
    isBlocked: { type: Boolean, default: false },
    registerType: {
        type: String,
        enum: Object.values(enum_1.RegisterType),
        default: enum_1.RegisterType.NORMAL,
    },
    tags: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: tag_entity_1.Tag.name,
            autopopulate: { maxDepth: 1 },
        },
    ],
    mySetting: { type: exports.MySettingSchema, default: new user_entities_1.MySetting() },
    slug: { type: String, trim: true },
    keyword: { type: String, trim: true },
}, {
    timestamps: true,
});
//# sourceMappingURL=user.schema.js.map