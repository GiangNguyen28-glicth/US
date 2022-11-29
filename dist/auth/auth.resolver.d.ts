import { User } from '../modules/user/entities/user.entities';
import { AuthService } from './auth.service';
import { LoginInput, RegisterInput, ResetPasswordInput } from './dto/auth.dto';
import { JwtPayload, RefreshPayload } from './entities/auth.entities';
export declare class AuthResolver {
    private authService;
    constructor(authService: AuthService);
    refreshToken(rfPayload: RefreshPayload): Promise<JwtPayload>;
    verifyTokenGoogle(token: string): Promise<JwtPayload>;
    verifyTokenFacebook(token: string): Promise<JwtPayload>;
    forgotPassword(email: string): Promise<boolean>;
    resetPassword(input: ResetPasswordInput): Promise<boolean>;
    signInAsAdmin(email: string, password: string): Promise<JwtPayload>;
    deleteAccount(user: User): Promise<boolean>;
    confirmDeleteAccount(code: number, email: string): Promise<boolean>;
    signIn(input: LoginInput): Promise<JwtPayload>;
    signUp(input: RegisterInput): Promise<boolean>;
    changePassword(user: User, oldPassword: string, newPassword: string, confirmPassword: string): Promise<boolean>;
    resetCache(): Promise<boolean>;
}
