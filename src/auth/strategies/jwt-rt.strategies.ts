import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_REFRESH_TOKEN_SECRET,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: any) {
    try {
      const refreshToken = req
        .get('authorization')
        .replace('Bearer', '')
        .trim();
      return {
        ...payload,
        refreshToken,
      };
    } catch (error) {
      throw new HttpException('Token Token', HttpStatus.UNAUTHORIZED);
    }
  }
}
