import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
@Injectable()
export class AtGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      if (!info) {
        throw new HttpException(err, HttpStatus.UNAUTHORIZED);
      }
      throw new HttpException(info, HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
