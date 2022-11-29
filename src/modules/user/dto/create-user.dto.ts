import { Field, Float, HideField, InputType } from '@nestjs/graphql';
import { IsEmail, IsOptional } from 'class-validator';
import { GraphQLObjectID } from 'graphql-scalars';
import {
  FilterByDate,
  GenderEnum,
  LookingFor,
  RegisterType,
  SortOption,
  StatusActive,
} from '../../../constants/enum';
import { User } from '../entities/user.entities';
import {
  IControlWhoSeesYou,
  IControlWhoYouSee,
  IDiscoverySettings,
  IGeoLocation,
  IMySetting,
  IUser,
  IUserUpdate,
} from '../interfaces/user';

@InputType()
export class GeoLocationInput implements IGeoLocation {
  @Field(() => [Float], {
    description: 'Position 0 is Longitude , 1 is Latitude',
  })
  coordinates: number[];
}

@InputType()
export class UpdateUserInput implements IUserUpdate {
  @Field({ nullable: true })
  username: string;

  @Field(() => GenderEnum, { nullable: true })
  gender: GenderEnum;

  @Field({ nullable: true })
  phoneNumber: string;

  @Field(() => Date, { nullable: true })
  birthDays: Date;

  @Field(() => [String], { nullable: true })
  images: string[];

  @Field(() => [GraphQLObjectID], { nullable: true })
  tags: string[];

  @Field({ nullable: true })
  showMeTinder: boolean;

  @Field({ nullable: true })
  liveAt: string;

  @Field({ nullable: true })
  jobTitle: string;

  @Field({ nullable: true })
  school: string;

  @Field({ nullable: true })
  company: string;

  @Field({ nullable: true })
  aboutMe: string;

  @Field(() => Boolean, { nullable: true })
  isFirstLogin: boolean;
}

@InputType()
export class DiscoverySettingsInput implements IDiscoverySettings {
  @Field(() => Number, { nullable: true })
  minAge: number;

  @Field(() => Number, { nullable: true })
  maxAge: number;

  @Field(() => Boolean, { nullable: true })
  onlyShowAgeThisRange: boolean;

  @Field(() => Number, { nullable: true })
  distance: number;

  @Field(() => Boolean, { nullable: true })
  onlyShowDistanceThisRange: boolean;

  @Field(() => LookingFor, { nullable: true })
  lookingFor: LookingFor;
}

@InputType()
export class ControlWhoSeesYouInput implements IControlWhoSeesYou {
  @Field(() => Boolean, { nullable: true })
  standard: boolean;

  @Field(() => Boolean, { nullable: true })
  onlyPeopleIveLiked: boolean;
}

@InputType()
export class ControlWhoYouSeeInput implements IControlWhoYouSee {
  @Field(() => Boolean, { nullable: true })
  balancedRecommendations: boolean;

  @Field(() => Boolean, { nullable: true })
  recentlyActive: boolean;
}

@InputType()
export class MySettingInput implements IMySetting {
  @Field(() => DiscoverySettingsInput, { nullable: true })
  discovery: DiscoverySettingsInput;

  @Field(() => ControlWhoSeesYouInput, { nullable: true })
  controlWhoSeesYou: ControlWhoSeesYouInput;

  @Field(() => ControlWhoYouSeeInput, { nullable: true })
  controlWhoYouSee: ControlWhoYouSeeInput;
}

@InputType()
export class FilterGetOneUser implements Partial<IUser> {
  @Field(() => GraphQLObjectID, { nullable: true })
  _id?: string;

  @Field({ nullable: true })
  slug?: string;

  @IsEmail()
  @IsOptional()
  @Field({ nullable: true })
  email?: string;

  @HideField()
  registerType?: RegisterType;

  @HideField()
  resetPasswordCode?: string;
}

@InputType()
export class FilterGetAllUser implements Partial<IUser> {
  @Field(() => [String], { nullable: true })
  matched?: string[];

  @Field(() => StatusActive, { nullable: true })
  statusActive?: StatusActive;
}

export class NewInformationAfterLogin {
  coordinates?: number[];
  user?: User;
}

@InputType()
export class FilterStatisticUser implements Partial<IUser> {
  @Field(() => FilterByDate, { nullable: true })
  filterByDate: FilterByDate;

  @Field({ nullable: true })
  username: string;

  @Field(() => GenderEnum, { nullable: true })
  gender?: GenderEnum;

  @Field(() => Boolean, { nullable: true })
  isInActive: boolean;

  @Field(() => SortOption, { nullable: true })
  sortOption: SortOption;
}
