import { Field, ObjectType } from '@nestjs/graphql';
import { IAuthenticateResponse } from '../interfaces/auth';
@ObjectType()
export class IJwtPayload {
  @Field(() => String, { nullable: true })
  _id?: string;

  @Field({ nullable: true })
  email: string;
}
@ObjectType()
export class JwtPayload implements IAuthenticateResponse {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}

export class RefreshPayload {
  _id: string;
  refreshToken: string;
}

export class RefreshResponse {}
