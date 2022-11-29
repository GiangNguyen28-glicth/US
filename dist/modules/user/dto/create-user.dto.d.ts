import { FilterByDate, GenderEnum, LookingFor, RegisterType, SortOption, StatusActive } from '../../../constants/enum';
import { User } from '../entities/user.entities';
import { IControlWhoSeesYou, IControlWhoYouSee, IDiscoverySettings, IGeoLocation, IMySetting, IUser, IUserUpdate } from '../interfaces/user';
export declare class GeoLocationInput implements IGeoLocation {
    coordinates: number[];
}
export declare class UpdateUserInput implements IUserUpdate {
    username: string;
    gender: GenderEnum;
    phoneNumber: string;
    birthDays: Date;
    images: string[];
    tags: string[];
    showMeTinder: boolean;
    liveAt: string;
    jobTitle: string;
    school: string;
    company: string;
    aboutMe: string;
    isFirstLogin: boolean;
}
export declare class DiscoverySettingsInput implements IDiscoverySettings {
    minAge: number;
    maxAge: number;
    onlyShowAgeThisRange: boolean;
    distance: number;
    onlyShowDistanceThisRange: boolean;
    lookingFor: LookingFor;
}
export declare class ControlWhoSeesYouInput implements IControlWhoSeesYou {
    standard: boolean;
    onlyPeopleIveLiked: boolean;
}
export declare class ControlWhoYouSeeInput implements IControlWhoYouSee {
    balancedRecommendations: boolean;
    recentlyActive: boolean;
}
export declare class MySettingInput implements IMySetting {
    discovery: DiscoverySettingsInput;
    controlWhoSeesYou: ControlWhoSeesYouInput;
    controlWhoYouSee: ControlWhoYouSeeInput;
}
export declare class FilterGetOneUser implements Partial<IUser> {
    _id?: string;
    slug?: string;
    email?: string;
    registerType?: RegisterType;
    resetPasswordCode?: string;
}
export declare class FilterGetAllUser implements Partial<IUser> {
    matched?: string[];
    statusActive?: StatusActive;
}
export declare class NewInformationAfterLogin {
    coordinates?: number[];
    user?: User;
}
export declare class FilterStatisticUser implements Partial<IUser> {
    filterByDate: FilterByDate;
    username: string;
    gender?: GenderEnum;
    isInActive: boolean;
    sortOption: SortOption;
}
