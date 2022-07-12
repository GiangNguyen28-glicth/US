import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../modules/mail/mail.service';
import { FilterGetOneUser } from '../modules/user/dto/user.input';
import { UserDocument } from '../modules/user/schema/user.schema';
import { UserService } from '../modules/user/user.service';
import { randomCode } from '../utils/string.utils';
import {
  LoginInput,
  RegisterInput,
  ResetPasswordInput,
} from './dto/auth.input';
import { JwtPayload } from './entities/auth.entities';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private emailService: MailService,
    private jwtService: JwtService,
  ) {}
  async signUp(input: RegisterInput): Promise<boolean> {
    if (input.password != input.confirmpassword) {
      throw new HttpException('Mật khẩu không khớp', HttpStatus.BAD_REQUEST);
    }
    const filter: FilterGetOneUser = { email: input.email };
    const userExisting = await this.userService.getOne(filter);
    if (userExisting) {
      throw new HttpException('Tài khoản đã tồn tại', HttpStatus.BAD_REQUEST);
    }
    const user = await this.userService.signUp(input);
    const token = await this.emailService.generateToken(user.email);
    const urlConfirm = `${process.env.FRONT_END_URL_CONFIRM_MAIL}?token=${token}`;
    return (await this.emailService.sendVerifyMail(user, urlConfirm))
      ? true
      : false;
    // return true;
  }
  async signIn(loginInput: LoginInput): Promise<JwtPayload> {
    const user = await this.userService.login(loginInput);
    return await this.setJwt(user);
  }
  async setJwt(user: UserDocument): Promise<JwtPayload> {
    const { _id, keyword } = user;
    const [at, rt] = await this.getTokens(_id, keyword);
    user.currentHashedRefreshToken = rt;
    await user.save();
    const jwtpayload: JwtPayload = new JwtPayload();
    jwtpayload.accessToken = at;
    jwtpayload.refreshToken = rt;
    jwtpayload.payload = _id;
    jwtpayload.userInfo = user;
    return jwtpayload;
  }
  async getTokens(_id: string, keyword: string): Promise<any> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          _id: _id,
          keyword,
        },
        {
          secret: process.env.JWT_ACCESS_TOKEN_SECRET,
          expiresIn: parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME),
        },
      ),
      this.jwtService.signAsync(
        {
          _id: _id,
          keyword,
        },
        {
          secret: process.env.JWT_REFRESH_TOKEN_SECRET,
          expiresIn: parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME),
        },
      ),
    ]);
    return [at, rt];
  }
  async forgotPassword(email: string): Promise<boolean> {
    const user = await this.userService.getOne({ email });
    if (!user) {
      throw new HttpException('Email không tồn tại', HttpStatus.NOT_FOUND);
    }
    const randomString = randomCode(20);
    await Promise.all([
      await this.userService.generateResetCode(user, randomString),
      await this.emailService.sendResetPasswordMail(randomString, user),
    ]);
    return true;
  }
  async resetPassword(input: ResetPasswordInput): Promise<boolean> {
    return this.userService.verifyResetpassword(input);
  }
}
