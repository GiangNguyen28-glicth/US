import {
  GenderEnum,
  LookingFor,
  RegisterType,
  RoleEnum,
  StatusActive,
} from '../../../constants/enum';
import { ITag } from '../../tag/interfaces/tag';
import { User } from '../entities/user.entities';

export interface IUser extends IEntity {
  username: string;
  email: string;
  gender: GenderEnum;
  phoneNumber: string;
  password: string;
  age: number;
  birthDays: Date;
  liveAt: string;
  jobTitle: string;
  school: string;
  company: string;
  aboutMe: string;
  images: string[];
  matched: string[] | User[];
  matchRequest: IMatchRequest[];
  tags: ITag[] | string[];
  showMeTinder: boolean;
  geoLocation: IGeoLocation;
  lastActive: Date;
  isConfirmMail: boolean;
  isFirstLogin: boolean;
  role?: RoleEnum;
  registerType?: RegisterType;
  mySetting: IMySetting;
  statusActive?: StatusActive;
  address: IAddress;
  reports: IReports[];
  isBlocked?: boolean;
}

export interface IReports {
  reportBy: string | User;
  createdAt: Date;
  reasonReport: string;
  descriptionReport: string;
}

export interface IMySetting {
  discovery: IDiscoverySettings;
  controlWhoSeesYou: IControlWhoSeesYou;
  controlWhoYouSee: IControlWhoYouSee;
}

export interface IDiscoverySettings {
  minAge: number;
  maxAge: number;
  onlyShowAgeThisRange: boolean;
  distance: number;
  onlyShowDistanceThisRange: boolean;
  lookingFor: LookingFor;
}

export interface IControlWhoSeesYou {
  standard: boolean;
  onlyPeopleIveLiked: boolean;
}

export interface IControlWhoYouSee {
  balancedRecommendations: boolean;
  recentlyActive: boolean;
}

export interface IMatchRequest {
  sender: string | User;
  createdAt: Date;
}

export interface IGeoLocation {
  type?: string;
  coordinates: number[];
}

export interface IAddress {
  district: string;
  city: string;
  country: string;
}

type IUserUpdate = IEntityInput<
  IUser,
  | 'isConfirmMail'
  | 'matched'
  | 'matchRequest'
  | 'email'
  | 'lastActive'
  | 'registerType'
  | 'password'
  | 'address'
  | 'geoLocation'
  | 'mySetting'
  | 'reports'
  | 'age'
>;
