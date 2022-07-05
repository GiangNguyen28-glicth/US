import { Field, InputType, Int } from '@nestjs/graphql';
import { ObjectIDResolver } from 'graphql-scalars';

@InputType()
export class CreateOrderItemInput {
  @Field(() => ObjectIDResolver)
  orderId: string;
  @Field(() => ObjectIDResolver)
  productId: string;
  @Field(() => Int)
  quantity: number;
  @Field(() => Int)
  totalPrice: number;
}
