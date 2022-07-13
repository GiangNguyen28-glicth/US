import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';
import { ObjectIDResolver } from 'graphql-scalars';

@InputType()
export class CartInput {
  @Field(() => ObjectIDResolver)
  productId: string;
  @Field(() => Int)
  @Min(1)
  quantity: number;
}
