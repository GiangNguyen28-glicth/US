import {
  BadRequestException,
  CACHE_MANAGER,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
import { Cache } from 'cache-manager';
import { throwIfNotExists } from 'utils/model.utils';
import { Constants } from '../constants/constants';
import { RegisterType, RoleEnum } from '../constants/enum';
import { MailService } from '../modules/mail/mail.service';
import { MailResetPassword } from '../modules/mail/templates/mail.reset_password';
import { MailVerifyAccount } from '../modules/mail/templates/mail.verify';
import { User } from '../modules/user/entities/user.entities';
import { UserService } from '../modules/user/user.service';
import { randomCode } from '../utils/utils';
import { LoginInput, RegisterInput, ResetPasswordInput } from './dto/auth.dto';
import { JwtPayload, RefreshPayload } from './entities/auth.entities';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private mailService: MailService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async generateTokens(_id: string): Promise<JwtPayload> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { _id },
        {
          secret: process.env.JWT_ACCESS_TOKEN_SECRET,
          expiresIn: parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME),
        },
      ),
      this.jwtService.signAsync(
        { _id },
        {
          secret: process.env.JWT_REFRESH_TOKEN_SECRET,
          expiresIn: parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME),
        },
      ),
    ]);
    await this.cacheManager.set(_id, refreshToken, {
      ttl: Constants.REFRESH_TOKEN_TTL,
    });
    return { accessToken, refreshToken };
  }

  async changePassword(
    oldPassword: string,
    newPassword: string,
    confirmPassword: string,
    user: User,
  ) {
    if (newPassword != confirmPassword) {
      throw new BadRequestException('Mật khẩu không khớp');
    }
    return await this.userService.changePassword(
      oldPassword,
      newPassword,
      user,
    );
  }

  async resetPassword(input: ResetPasswordInput): Promise<boolean> {
    try {
      if (input.password != input.confirmPassword) {
        throw new BadRequestException('Mật khẩu không khớp');
      }
      const [user, hashPassword, code] = await Promise.all([
        this.userService.findOne({ email: input.email }),
        this.userService.hashPassword(input.password),
        this.cacheManager.get(
          `${Constants.RESET_CODE_PASSWORD}_${input.email}`,
        ),
      ]);
      if (!code) {
        throw new BadRequestException('Code hiện không còn khả dụng');
      }
      if (code != input.code) {
        throw new BadRequestException(
          'Code không chính xác. Vui lòng nhập lại !',
        );
      }
      await Promise.allSettled([
        this.userService.resetPassword(user, hashPassword),
        this.cacheManager.del(
          `${Constants.RESET_CODE_PASSWORD}_${input.email}`,
        ),
      ]);
      return true;
    } catch (error) {
      throw error;
    }
  }

  async signIn(input: LoginInput): Promise<JwtPayload> {
    try {
      const user = await this.userService.signIn(input);
      return await this.generateTokens(user._id.toString());
    } catch (error) {
      throw error;
    }
  }

  async signInAsAdmin(email: string, password: string): Promise<JwtPayload> {
    try {
      const user = await this.userService.signInAsAdmin(email, password);
      if (user.role === RoleEnum.USER) {
        throw new ForbiddenException('Please login with admin account');
      }
      return await this.generateTokens(user._id.toString());
    } catch (error) {
      throw error;
    }
  }

  async signUp(register: RegisterInput): Promise<boolean> {
    const code = randomCode();
    const [user] = await Promise.all([
      this.userService.signUp(register),
      this.cacheManager.set(
        `${Constants.VERIFY_ACCOUNT_CODE}_${register.email}`,
        code,
        60 * 15,
      ),
    ]);
    const html = MailVerifyAccount.createHTML(code.toString());
    await Promise.all([]);
    this.mailService.sendMail(
      user.email,
      Constants.VERIFY_ACCOUNT_SUBJECT,
      html,
    );
    return true;
  }

  async forgotPassword(email: string): Promise<boolean> {
    try {
      const user = await this.userService.getOne({ email });
      if (!user) {
        throw new BadRequestException(
          'Email không tồn tại. Vui lòng nhập lại email',
        );
      }
      const [ttlResetCode, cacheKey, code] = [
        60 * 15,
        `${Constants.RESET_CODE_PASSWORD}_${user.email}`,
        randomCode(),
      ];
      const html = MailResetPassword.createHTML(
        user.username || 'User',
        code.toString(),
      );
      await Promise.all([
        this.cacheManager.set(cacheKey, code, ttlResetCode),
        this.mailService.sendMail(user.email, 'Reset mật khẩu', html),
      ]);
      return true;
    } catch (error) {
      throw error;
    }
  }

  async deleteAccount(user: User): Promise<boolean> {
    try {
      const [ttlResetCode, cacheKey, code] = [
        60 * 15,
        `${Constants.RESET_CODE_DELETE_ACCOUNT}_${user.email}`,
        randomCode(),
      ];
      const html = code.toString();
      await Promise.all([
        this.cacheManager.set(cacheKey, code, ttlResetCode),
        this.mailService.sendMail(user.email, 'Xóa tài khoản', html),
      ]);
      return true;
    } catch (error) {
      throw error;
    }
  }

  async confirmDeleteAccount(code: number, email: string): Promise<boolean> {
    try {
      const [user, cacheValue] = await Promise.all([
        this.userService.findOne({ email }),
        this.cacheManager.get(
          `${Constants.RESET_CODE_DELETE_ACCOUNT}_${email}`,
        ),
      ]);
      if (!cacheValue) {
        throw new NotFoundException(
          'Code nhập vào đã hết hạn hoặc không khả dụng',
        );
      } else {
        if (cacheValue != code) {
          throw new BadRequestException('Code không đúng. Vui lòng nhập lại');
        } else {
          await Promise.allSettled([
            this.userService.findOneAndUpdate(
              { _id: user._id },
              { $set: { isDeleted: true } },
            ),
            this.cacheManager.del(
              `${Constants.RESET_CODE_DELETE_ACCOUNT}_${email}`,
            ),
          ]);

          return true;
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async refreshToken(rfPayload: RefreshPayload): Promise<JwtPayload> {
    try {
      const refreshToken = await this.cacheManager.get(rfPayload._id);
      if (!refreshToken) {
        throw new UnauthorizedException('Refresh is not accepted');
      } else {
        return await this.generateTokens(rfPayload._id);
      }
    } catch (error) {
      throw error;
    }
  }

  async loginWithOAuth2(
    user: User,
    registerType: RegisterType,
  ): Promise<JwtPayload> {
    try {
      const [userOAuth2, userNormal] = await Promise.all([
        this.userService.getOne({
          email: user.email,
          registerType: registerType,
        }),
        this.userService.getOne({
          email: user.email,
          registerType: RegisterType.NORMAL,
        }),
      ]);
      if (!userOAuth2 && !userNormal) {
        const newUser = await this.userService.createWithOAuth2(user);
        return await this.generateTokens(newUser._id.toString());
      } else if (userNormal) {
        throw new BadRequestException('Email has been used !');
      }
      return await this.generateTokens(userOAuth2._id.toString());
    } catch (error) {
      throw error;
    }
  }

  async loginWithFacebook(req): Promise<JwtPayload> {
    try {
      return await this.loginWithOAuth2(req, RegisterType.FACEBOOK);
    } catch (error) {
      throw error;
    }
  }

  async loginWithGoogle(req): Promise<JwtPayload> {
    try {
      return await this.loginWithOAuth2(req, RegisterType.GOOGLE);
    } catch (error) {
      throw error;
    }
  }

  async resetCache(): Promise<boolean> {
    try {
      await this.cacheManager.reset();
      return true;
    } catch (error) {
      throw error;
    }
  }

  async verifyTokenGoogle(token: string): Promise<JwtPayload> {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`,
      );
      if (!response.data.email) {
        throw new UnauthorizedException('Token not accepted');
      }
      const user = new User();
      user.email = response.data.email;
      user.username = response.data.name;
      user.images = [response.data.picture];
      user.registerType = RegisterType.GOOGLE;
      user.isConfirmMail = true;
      return await this.loginWithOAuth2(user, user.registerType);
    } catch (error) {
      throw error;
    }
  }

  async verifyTokenFacebook(token: string): Promise<JwtPayload> {
    try {
      const response = await axios.get(
        `https://graph.facebook.com/me?fields=id,email,name,picture.type(large)&access_token=${token}`,
      );
      console.log(response);
      if (!response.data.email) {
        throw new UnauthorizedException('Token not accepted');
      }
      const user = new User();
      if (response.data.email) {
        user.email = response.data.email;
      } else {
        user.email = `${response.data.id}@gmail.com`;
      }
      user.username = response.data.name;
      user.images = [response.data.picture.data.url];
      user.registerType = RegisterType.FACEBOOK;
      user.isConfirmMail = true;
      return await this.loginWithOAuth2(user, user.registerType);
    } catch (error) {
      throw error;
    }
  }
}
