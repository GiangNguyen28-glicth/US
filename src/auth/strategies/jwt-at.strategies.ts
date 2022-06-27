import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { FilterGetOneUser } from '../../modules/user/dto/user.input';
import { User } from '../../modules/user/entities/user.entities';
import { UserService } from '../../modules/user/user.service';
import { IJwtPayload } from '../entities/auth.entities';
@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET,
    });
  }
  async validate(payload: IJwtPayload): Promise<User> {
    try {
      const input: FilterGetOneUser = payload;
      const user = await this.userService.getOne(input);
      if (!user) {
        throw new HttpException(
          'Authentication Failed',
          HttpStatus.UNAUTHORIZED,
        );
      }
      return user;
    } catch (error) {
      throw new HttpException('Token hết hạn', HttpStatus.UNAUTHORIZED);
    }
  }
}
