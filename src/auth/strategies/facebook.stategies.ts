import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-facebook';
import { RegisterType } from '../../constants/enum';
import { User } from '../../modules/user/entities/user.entities';
@Injectable()
export class FaceBookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor() {
    super({
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: 'http://localhost:2000/auth/facebook/callback',
      profileFields: ['name', 'picture.type(large)', 'email', 'gender'],
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    console.log(accessToken);
    const { name, photos, emails } = profile;
    const user = new User();
    user.email = emails[0].value;
    user.username = name.givenName + ' ' + name.familyName;
    user.images = [photos[0].value];
    user.registerType = RegisterType.FACEBOOK;
    user.isConfirmMail = true;
    done(null, user);
  }
}
