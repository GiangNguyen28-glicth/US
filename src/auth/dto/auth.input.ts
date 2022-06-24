import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, Matches } from 'class-validator';

@InputType()
export class RegisterInput {
  @Field()
  username: string;
  @Field()
  @IsEmail()
  email: string;
  @Field()
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
    message: '8 ký tự bao gồm 1 ký tự hoa, 1 ký tự đặc biệt,1 số',
  })
  password: string;
  @Field()
  @Matches(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/, {
    message: 'Số điện thoại không hợp lệ',
  })
  phonenumber: string;
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
