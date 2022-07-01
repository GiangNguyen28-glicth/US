import { Field, InputType, Int } from '@nestjs/graphql';
import { ObjectIDResolver } from 'graphql-scalars';

@InputType()
export class CreateCartInput {
  @Field(() => ObjectIDResolver)
  productId: string;
  @Field(() => Int)
  quantity: number;
}
