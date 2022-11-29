import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { StatusActive } from '../../constants/enum';
import { User } from '../../modules/user/entities/user.entities';
import { UserService } from '../../modules/user/user.service';
import { IJwtPayload } from '../entities/auth.entities';

@Injectable()
export class WsStrategy extends PassportStrategy(Strategy, 'ws') {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET,
    });
  }

  async validate(payload: IJwtPayload): Promise<User> {
    try {
      const user = await this.userService.findOne({ _id: payload._id });
      if (!user) {
        throw new UnauthorizedException('jwt not accepted');
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
}
