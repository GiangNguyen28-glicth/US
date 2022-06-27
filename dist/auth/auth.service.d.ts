import { JwtService } from '@nestjs/jwt';
import { MailService } from '../modules/mail/mail.service';
import { UserDocument } from '../modules/user/schema/user.schema';
import { UserService } from '../modules/user/user.service';
import { LoginInput, RegisterInput, ResetPasswordInput } from './dto/auth.input';
import { JwtPayload } from './entities/auth.entities';
export declare class AuthService {
    private userService;
    private emailService;
    private jwtService;
    constructor(userService: UserService, emailService: MailService, jwtService: JwtService);
    signUp(input: RegisterInput): Promise<boolean>;
    signIn(loginInput: LoginInput): Promise<JwtPayload>;
    setJwt(user: UserDocument): Promise<JwtPayload>;
    getTokens(_id: string, username: string): Promise<any>;
    forgotPassword(email: string): Promise<boolean>;
    resetPassword(input: ResetPasswordInput): Promise<boolean>;
}
