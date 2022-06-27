import { Field, InputType, Int } from '@nestjs/graphql';
import { ObjectIDResolver } from 'graphql-scalars';

@InputType()
export class CreateProductInput {
  @Field({ nullable: true })
  name?: string;
  @Field(() => Int)
  price: number;
  @Field({ nullable: true })
  title: string;
  @Field(() => Int, { nullable: true })
  discount?: number;
  @Field(() => Int)
  quantity: number;
  @Field({ nullable: true })
  url?: string;
  @Field(() => ObjectIDResolver)
  categoryId: string;
}
