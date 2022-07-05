import { Field, InputType } from '@nestjs/graphql';
import { BaseUser } from '../../../auth/dto/auth.input';

@InputType()
export class CreateOrderInput extends BaseUser {
  @Field()
  address: string;
}
