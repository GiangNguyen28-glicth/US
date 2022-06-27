import { AuthService } from './auth.service';
import { LoginInput, RegisterInput, ResetPasswordInput } from './dto/auth.input';
import { JwtPayload } from './entities/auth.entities';
export declare class AuthResolver {
    private authService;
    constructor(authService: AuthService);
    login(input: LoginInput): Promise<JwtPayload>;
    register(input: RegisterInput): Promise<boolean>;
    forgotPassword(email: string): Promise<boolean>;
    resetPassword(input: ResetPasswordInput): Promise<boolean>;
}
