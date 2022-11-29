import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    googleAuth(req: any): Promise<void>;
    facebookAuth(req: any): Promise<void>;
    facebookAuthRedirect(req: any): Promise<import("./entities/auth.entities").JwtPayload>;
    googleAuthRedirect(req: any): Promise<import("./entities/auth.entities").JwtPayload>;
    hello(): string;
}
