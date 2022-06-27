import { User } from '../../modules/user/entities/user.entities';
export declare class IJwtPayload {
    _id?: string;
}
export declare class JwtPayload {
    accessToken?: string;
    refreshToken?: string;
    payload?: IJwtPayload;
    userInfo?: User;
}
