import { Field, InputType, Int } from '@nestjs/graphql';
import { ObjectIDResolver } from 'graphql-scalars';

@InputType()
export class ReviewInput {
  @Field(() => ObjectIDResolver)
  productId: string;
  @Field(() => Int)
  rating: number;
}
