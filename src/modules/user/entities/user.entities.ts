import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import { GenderEnum, RoleEnum } from '../../../constants/enum';

@ObjectType()
export class User {
  @Field(() => ID, { nullable: true })
  _id?: string;
  @Field({ nullable: true })
  username?: string;
  @Field({ nullable: true })
  email?: string;
  @HideField()
  password?: string;
  @Field({ nullable: true })
  phonenumber?: string;
  @Field(() => GenderEnum, { nullable: true })
  gender?: GenderEnum;
  @Field({ nullable: true })
  address?: string;
  @Field(() => RoleEnum, { nullable: true })
  role?: RoleEnum;
  @Field({ nullable: true })
  createAt?: Date;
  @Field({ nullable: true })
  updateAt?: Date;
  @HideField()
  isEmailConfirmed?: boolean;
  @HideField()
  isExprise?: Date;
  @HideField()
  currentHashedRefreshToken?: string;
  @HideField()
  resetPasswordCode: string;
  @Field({ nullable: true })
  keyword: string;
  @Field({ nullable: true })
  slug: string;
}
