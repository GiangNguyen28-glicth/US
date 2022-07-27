import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { Permission } from '../../constants/enum';
import { User } from '../../modules/user/entities/user.entities';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const permissions = this.reflector.getAllAndOverride<string[]>(
      'permission',
      [context.getHandler()],
    );
    const user: User = request?.user;
    const isFullRole = user.permission.includes(Permission.FULL);
    // if (!isFullRole) {
    //   return true;
    // }
    const isValidRole = permissions.every(item =>
      user.permission.includes(item as Permission),
    );
    console.log('oke :', isValidRole);
    return true;
  }
}
