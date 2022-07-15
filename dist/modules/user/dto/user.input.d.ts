import { BaseUser } from '../../../auth/dto/auth.input';
import { GenderEnum, RoleEnum } from '../../../constants/enum';
export declare class FilterGetOneUser {
    _id?: string;
    email?: string;
    keyword?: string;
    custom?: object;
}
export declare class CreateUserInput {
    username: string;
    email: string;
    password: string;
    gender?: GenderEnum;
    role?: RoleEnum;
    verifyEmail?: boolean;
}
export declare class UpdateUserInput extends BaseUser {
}
