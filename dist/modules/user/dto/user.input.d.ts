import { BaseUser } from '../../../auth/dto/auth.input';
import { GenderEnum } from '../../../constants/enum';
export declare class FilterGetOneUser {
    _id?: string;
    email?: string;
    username?: string;
    custom?: object;
}
export declare class CreateUserInput {
    username: string;
    email: string;
    password: string;
    gender?: GenderEnum;
    role?: true;
    verifyEmail?: boolean;
}
export declare class UpdateUserInput extends BaseUser {
}
