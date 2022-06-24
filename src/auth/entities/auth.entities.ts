import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../modules/user/entities/user.entities';
@ObjectType()
export class IJwtPayload {
  @Field(() => String, { nullable: true })
  _id?: string;
}
@ObjectType()
export class JwtPayload {
  @Field({ nullable: true })
  accessToken?: string;
  @Field({ nullable: true })
  refreshToken?: string;
  @Field(() => IJwtPayload, { nullable: true })
  payload?: IJwtPayload;
  @Field(() => User, { nullable: true })
  userInfo?: User;
}
