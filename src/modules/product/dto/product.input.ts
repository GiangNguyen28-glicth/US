import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';
import { ObjectIDResolver } from 'graphql-scalars';
import { SortProductEnum } from 'constants/enum';
import { IProduct, IProductCreate } from '../interfaces/product';
import { Types } from 'mongoose';

@InputType()
export class CreateProductInput implements IProductCreate {
  @Field({ nullable: true })
  name: string;
  @Field(() => Int)
  price: number;
  @Field({ nullable: true })
  title: string;
  @Field(() => Int, { nullable: true })
  discount: number;
  @Field(() => Int)
  quantity: number;
  @Field(() => [String], { nullable: true })
  imgUrl: string[];
  @Field(() => ObjectIDResolver)
  category: string;
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
export class SortProductInput {
  @Field(() => SortProductEnum, { nullable: true })
  filterby: SortProductEnum;
}
@InputType()
export class BasePagenation {
  @Field(() => Int, { nullable: true })
  page?: number;
  @Field(() => Int, { nullable: true })
  size?: number;
}
@InputType()
export class FilterProduct {
  @Field(() => Int, { nullable: true })
  @Min(0)
  minPrice = 0;
  @Field(() => Int, { nullable: true })
  maxPrice: number;
  @Field({ nullable: true })
  name?: string;
  @Field(() => Boolean, { nullable: true })
  isDiscount?: boolean;
  @Field(() => ObjectIDResolver, { nullable: true })
  productId: string;
}

@InputType()
export class SearchProductInput extends BasePagenation {
  @Field({ nullable: true })
  name?: string;
}

@InputType()
export class OptionFilterProduct extends BasePagenation {
  @Field({ nullable: true })
  filter: FilterProduct;
  @Field({ nullable: true })
  sort: SortProductEnum;
}
