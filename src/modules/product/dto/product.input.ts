import { Field, InputType, Int } from '@nestjs/graphql';
import { ObjectIDResolver } from 'graphql-scalars';
import { FilterProduct } from '../../../constants/enum';

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
  @Field(() => [String], { nullable: true })
  imgUrl?: [];
  @Field(() => ObjectIDResolver)
  category: string;
}
@InputType()
export class SearchProductInput {
  @Field(() => ObjectIDResolver, { nullable: true })
  category?: string;
  @Field({ nullable: true })
  name?: string;
  @Field(() => Int, { nullable: true })
  price: number;
}
@InputType()
export class UpdateProduct {
  @Field({ nullable: true })
  name?: string;
  @Field(() => Int, { nullable: true })
  price?: number;
  @Field(() => Int, { nullable: true })
  rating?: number;
  @Field(() => Int, { nullable: true })
  quantity?: number;
}
@InputType()
export class FilterProductInput {
  @Field(() => FilterProduct, { nullable: true })
  filterby: FilterProduct;
}
