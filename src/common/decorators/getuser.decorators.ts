import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GetUser = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    return request.user;
  },
);

export const GetUserWS = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const user = context.switchToWs().getClient().handshake.user;
    return user;
  },
);
