import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { User } from '../user/entities/user.entities';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { ConfirmMailInput } from './dto/mail.input';
export declare class MailService {
    private jwtservice;
    private userService;
    constructor(jwtservice: JwtService, userService: UserService);
    transporter(): nodemailer.Transporter<SMTPTransport.SentMessageInfo>;
    sendVerifyMail(user: User, urlConfirm: string): Promise<SMTPTransport.SentMessageInfo>;
    generateToken(email: string): Promise<string>;
    decodeConfirmationToken(token: string): Promise<any>;
    confirmEmail(confirmEmailInput: ConfirmMailInput): Promise<boolean>;
    sendResetPasswordMail(randomCode: string, user: User): Promise<SMTPTransport.SentMessageInfo>;
}
