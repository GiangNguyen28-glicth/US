import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class WsGuard extends AuthGuard('ws') {
  getRequest(context: ExecutionContext) {
    const ctx = context.switchToWs().getClient().handshake;
    return ctx;
  }
  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      if (!info) {
        throw new UnauthorizedException(err.message);
      }
      throw new UnauthorizedException(err.message);
    }
    return user;
  }
}
