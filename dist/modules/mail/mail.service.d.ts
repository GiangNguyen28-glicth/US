import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { Cache } from 'cache-manager';
export declare class MailService {
    private jwtService;
    private userService;
    private cacheManager;
    constructor(jwtService: JwtService, userService: UserService, cacheManager: Cache);
    transporter(): nodemailer.Transporter<SMTPTransport.SentMessageInfo>;
    sendMail(email: string, subject: string, html: string): Promise<SMTPTransport.SentMessageInfo>;
    generateToken(email: string): Promise<string>;
    decodeConfirmationToken(token: string): Promise<string>;
    confirmEmail(email: string, code: number): Promise<boolean>;
}
