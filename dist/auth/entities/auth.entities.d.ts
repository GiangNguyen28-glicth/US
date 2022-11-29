import { IAuthenticateResponse } from '../interfaces/auth';
export declare class IJwtPayload {
    _id?: string;
    email: string;
}
export declare class JwtPayload implements IAuthenticateResponse {
    accessToken: string;
    refreshToken: string;
}
export declare class RefreshPayload {
    _id: string;
    refreshToken: string;
}
export declare class RefreshResponse {
}
