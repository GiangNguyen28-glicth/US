import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { RegisterType } from '../../constants/enum';
import { User } from '../../modules/user/entities/user.entities';
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:2000/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    console.log(accessToken);
    const { name, emails, photos } = profile;
    const user = new User();
    user.email = emails[0].value;
    user.username = name.givenName + ' ' + name.familyName;
    user.images = [photos[0].value];
    user.registerType = RegisterType.GOOGLE;
    user.isConfirmMail = true;
    done(null, user);
  }
}
