import { Field, InputType } from '@nestjs/graphql';
import { BaseUser } from '../../../auth/dto/auth.input';
import { GenderEnum, RoleEnum } from '../../../constants/enum';

@InputType()
export class FilterGetOneUser {
  @Field({ nullable: true })
  _id?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  keyword?: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  custom?: object;
}

@InputType()
export class CreateUserInput {
  @Field({ nullable: true })
  username: string;
  @Field({ nullable: true })
  email: string;
  @Field({ nullable: true })
  password: string;
  @Field(() => GenderEnum, { nullable: true })
  gender?: GenderEnum;
  @Field(() => RoleEnum, { nullable: true })
  role?: true;
  @Field({ nullable: true })
  verifyEmail?: boolean;
}
@InputType()
export class UpdateUserInput extends BaseUser {}
