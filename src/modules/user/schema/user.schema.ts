import { Model, Schema } from 'mongoose';
import {
  GenderEnum,
  LookingFor,
  RegisterType,
  RoleEnum,
  StatusActive,
} from '../../../constants/enum';
import { Tag } from '../../tag/entities/tag.entity';
import {
  Address,
  ControlWhoSeesYou,
  ControlWhoYouSee,
  DiscoverySettings,
  GeoLocation,
  MatchRequest,
  MySetting,
  Reports,
  User,
} from '../entities/user.entities';

export const GeoLocationSchema = new Schema<GeoLocation>(
  {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  { _id: false },
);

export const MatchRequestSchema = new Schema<MatchRequest>(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: User.name,
    },
    createdAt: { type: Date },
  },
  { _id: false },
);

export const DiscoverySettingsSchema = new Schema<DiscoverySettings>(
  {
    maxAge: { type: Number, default: 35 },
    minAge: { type: Number, default: 18 },
    lookingFor: {
      type: String,
      enum: Object.values(LookingFor),
      default: LookingFor.ALL,
    },
    distance: { type: Number, default: 150 },
    onlyShowAgeThisRange: { type: Boolean, default: true },
    onlyShowDistanceThisRange: { type: Boolean, default: true },
  },
  { _id: false },
);

export const ControlWhoSeesYouSchema = new Schema<ControlWhoSeesYou>(
  {
    standard: { type: Boolean, default: true },
    onlyPeopleIveLiked: { type: Boolean, default: false },
  },
  { _id: false },
);

export const ControlWhoYouSeeSchema = new Schema<ControlWhoYouSee>(
  {
    balancedRecommendations: { type: Boolean, default: true },
    recentlyActive: { type: Boolean, default: false },
  },
  { _id: false },
);

export const AddressSchema = new Schema<Address>(
  {
    district: { type: String, trim: true },
    city: { type: String, trim: true },
    country: { type: String, trim: true },
  },
  { _id: false },
);

export const MySettingSchema = new Schema<MySetting>(
  {
    discovery: {
      type: DiscoverySettingsSchema,
      default: new DiscoverySettings(),
    },
    controlWhoSeesYou: {
      type: ControlWhoSeesYouSchema,
      default: new ControlWhoSeesYou(),
    },
    controlWhoYouSee: {
      type: ControlWhoYouSeeSchema,
      default: new ControlWhoYouSee(),
    },
  },
  { _id: false },
);

export const ReportsSchema = new Schema<Reports>(
  {
    reportBy: {
      type: Schema.Types.ObjectId,
      ref: User.name,
      autopopulate: false,
    },
    createdAt: { type: Date, default: new Date() },
    reasonReport: { type: String, trim: true },
    descriptionReport: { type: String, trim: true },
  },
  { _id: false },
);

export type UserModelType = Model<User>;
export const UserSchema = new Schema<User>(
  {
    username: { type: String, trim: true },
    email: { type: String, trim: true },
    password: { type: String, trim: true },
    address: { type: AddressSchema, default: new Address() },
    showMeTinder: { type: Boolean, default: true },
    jobTitle: { type: String, trim: true },
    school: { type: String, trim: true },
    aboutMe: { type: String, trim: true },
    company: { type: String, trim: true },
    age: { type: Number },
    gender: {
      type: String,
      trim: true,
      enum: Object.values(GenderEnum),
      default: GenderEnum.MALE,
    },
    phoneNumber: { type: String, trim: true },
    birthDays: { type: Date },
    images: { type: [String], default: [] },
    geoLocation: { type: GeoLocationSchema },
    lastActive: { type: Date, default: new Date() },
    isDeleted: { type: Boolean, default: false },
    isFirstLogin: { type: Boolean, default: false },
    isConfirmMail: { type: Boolean, default: false },
    matchRequest: { type: [MatchRequestSchema], default: [] },
    reports: [{ type: ReportsSchema, default: [] }],
    matched: [{ type: Schema.Types.ObjectId, ref: User.name }],
    statusActive: { type: String, enum: Object.values(StatusActive) },
    role: {
      type: String,
      enum: Object.values(RoleEnum),
      default: RoleEnum.USER,
    },
    isBlocked: { type: Boolean, default: false },
    registerType: {
      type: String,
      enum: Object.values(RegisterType),
      default: RegisterType.NORMAL,
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: Tag.name,
        autopopulate: { maxDepth: 1 },
      },
    ],
    mySetting: { type: MySettingSchema, default: new MySetting() },
    slug: { type: String, trim: true },
    keyword: { type: String, trim: true },
  },
  {
    timestamps: true,
  },
);
