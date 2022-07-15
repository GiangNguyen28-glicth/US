import { GenderEnum, RoleEnum } from '../../../constants/enum';
import { IUser } from '../interfaces/user';
export declare class User implements IUser {
    _id: string;
    username?: string;
    email?: string;
    password?: string;
    phonenumber?: string;
    gender?: GenderEnum;
    address?: string;
    role?: RoleEnum;
    createAt: Date;
    updateAt: Date;
    isEmailConfirmed?: boolean;
    isExprise?: Date;
    currentHashedRefreshToken?: string;
    resetPasswordCode: string;
    keyword: string;
    slug: string;
}
