import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsOptional, Matches } from 'class-validator';
import { ObjectIDResolver } from 'graphql-scalars';

@InputType()
export class BaseUser {
  @Field({ nullable: true })
  username?: string;
  @Field({ nullable: true })
  @Matches(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/, {
    message: 'Số điện thoại không hợp lệ',
  })
  @IsOptional()
  phonenumber?: string;
}
@InputType()
export class BasePassword {
  @Field()
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
    message: '8 ký tự bao gồm 1 ký tự hoa, 1 ký tự đặc biệt,1 số',
  })
  password: string;
}
@InputType()
export class RegisterInput extends BaseUser {
  @Field()
  @IsEmail()
  email: string;
  @Field()
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
    message: '8 ký tự bao gồm 1 ký tự hoa, 1 ký tự đặc biệt,1 số',
  })
  password: string;
  @Field()
  confirmpassword: string;
}
@InputType()
export class LoginInput {
  @Field()
  @IsEmail()
  email: string;
  @Field()
  password: string;
}
@InputType()
export class ResetPasswordInput extends BasePassword {
  @Field()
  code: string;
  @Field(() => ObjectIDResolver)
  userId: string;
  @Field()
  confirmpassword: string;
}
