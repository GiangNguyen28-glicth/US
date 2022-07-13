import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { User } from '../user/entities/user.entities';
import { verifyEmailTemplate } from './templates/mail.verify';
import { resetPasswordMailTemplate } from './templates/mail.resetpassword';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { ConfirmMailInput } from './dto/mail.input';
@Injectable()
export class MailService {
  constructor(
    private jwtservice: JwtService,
    private userService: UserService,
  ) {}
  transporter(): nodemailer.Transporter<SMTPTransport.SentMessageInfo> {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD, // naturally, replace both with your real credentials or an application-specific password
      },
    });
  }
  async sendVerifyMail(
    user: User,
    urlConfirm: string,
  ): Promise<SMTPTransport.SentMessageInfo> {
    return await this.transporter().sendMail({
      from: process.env.MAIL_USERNAME,
      to: user.email,
      subject: 'Verify Your Email',
      html: verifyEmailTemplate(user.username, urlConfirm),
    });
  }
  async generateToken(email: string): Promise<string> {
    const token = await this.jwtservice.sign(
      { email },
      {
        secret: process.env.JWT_VERIFICATION_EMAIL_TOKEN_SECRET,
        expiresIn: parseInt(process.env.JWT_VERIFICATION_EXPIRATION_TIME),
      },
    );
    return token;
  }
  async decodeConfirmationToken(token: string): Promise<string> {
    try {
      const payload = await this.jwtservice.verify(token, {
        secret: process.env.JWT_VERIFICATION_EMAIL_TOKEN_SECRET,
      });
      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email;
      }
      throw new HttpException(
        'Lỗi trong khi xác thực Email',
        HttpStatus.BAD_REQUEST,
      );
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new HttpException('Url đã hết hạn', HttpStatus.BAD_GATEWAY);
      }
      throw new HttpException(
        'Không thể xác thực token',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async confirmEmail(token: string): Promise<boolean> {
    const email: string = await this.decodeConfirmationToken(token);
    if (!email) {
      throw new HttpException(
        'Không thể xác thực Token',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.userService.getOne({ email });
    if (user.isEmailConfirmed) {
      throw new HttpException('Email đã được xác minh', HttpStatus.BAD_REQUEST);
    }
    await this.userService.markEmailAsConfirmed(email);
    return true;
  }
  async sendResetPasswordMail(
    randomCode: string,
    user: User,
  ): Promise<SMTPTransport.SentMessageInfo> {
    return await this.transporter().sendMail({
      from: process.env.EMAIL_USERNAME,
      to: user.email,
      subject: 'Reset password',
      html: resetPasswordMailTemplate(user.username, randomCode),
    });
  }
}
