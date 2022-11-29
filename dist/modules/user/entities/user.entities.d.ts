import { GenderEnum, LookingFor, RegisterType, RoleEnum, StatusActive } from '../../../constants/enum';
import { Tag } from '../../tag/entities/tag.entity';
import { IAddress, IControlWhoSeesYou, IControlWhoYouSee, IDiscoverySettings, IGeoLocation, IMatchRequest, IMySetting, IReports, IUser } from '../interfaces/user';
export declare class GeoLocation implements IGeoLocation {
    type: string;
    coordinates: number[];
}
export declare class DiscoverySettings implements IDiscoverySettings {
    minAge: number;
    maxAge: number;
    onlyShowAgeThisRange: boolean;
    distance: number;
    onlyShowDistanceThisRange: boolean;
    lookingFor: LookingFor;
}
export declare class ControlWhoSeesYou implements IControlWhoSeesYou {
    standard: boolean;
    onlyPeopleIveLiked: boolean;
}
export declare class ControlWhoYouSee implements IControlWhoYouSee {
    balancedRecommendations: boolean;
    recentlyActive: boolean;
}
export declare class MySetting implements IMySetting {
    discovery: DiscoverySettings;
    controlWhoSeesYou: ControlWhoSeesYou;
    controlWhoYouSee: ControlWhoYouSee;
}
export declare class Address implements IAddress {
    district: string;
    city: string;
    country: string;
}
export declare class User implements IUser {
    _id: string;
    email: string;
    username: string;
    gender: GenderEnum;
    phoneNumber: string;
    password: string;
    address: Address;
    birthDays: Date;
    age: number;
    images: string[];
    geoLocation: GeoLocation;
    matched: User[];
    tags: Tag[];
    showMeTinder: boolean;
    lastActive: Date;
    calcDistance: number;
    statusActive?: StatusActive;
    mySetting: MySetting;
    matchRequest: MatchRequest[];
    reports: Reports[];
    liveAt: string;
    jobTitle: string;
    school: string;
    company: string;
    aboutMe: string;
    isDeleted: boolean;
    isFirstLogin: boolean;
    createdAt: Date;
    updatedAt: Date;
    slug?: string;
    keyword: string;
    isBlocked?: boolean;
    isConfirmMail: boolean;
    registerType?: RegisterType;
    role?: RoleEnum;
}
export declare class Reports implements IReports {
    reportBy: User;
    createdAt: Date;
    reasonReport: string;
    descriptionReport: string;
}
export declare class MatchRequest implements IMatchRequest {
    sender: string | User;
    createdAt: Date;
}
export declare class UserResult implements IResult<User> {
    results: User[];
    totalCount: number;
}
