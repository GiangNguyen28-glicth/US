import { User } from '../modules/user/entities/user.entities';
import { UserService } from '../modules/user/user.service';
import { AuthService } from './auth.service';
import { LoginInput, RegisterInput, ResetPasswordInput } from './dto/auth.input';
import { JwtPayload } from './entities/auth.entities';
export declare class AuthResolver {
    private authService;
    private userService;
    constructor(authService: AuthService, userService: UserService);
    refreshToken(user: User): Promise<JwtPayload>;
    login(input: LoginInput): Promise<JwtPayload>;
    register(input: RegisterInput): Promise<boolean>;
    forgotPassword(email: string): Promise<boolean>;
    resetPassword(input: ResetPasswordInput): Promise<boolean>;
}
