import { Field, Float, HideField, ID, Int, ObjectType } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { SortProductEnum } from '../../../constants/enum';
import { Category } from '../../category/entites/category.entities';
import { IProduct } from '../interfaces/product';

@ObjectType()
export class Product implements IProduct {
  @Field(() => ID)
  _id: string;
  @Field({ nullable: true })
  name: string;
  @Field(() => Float)
  price: Types.Decimal128 | number;
  @Field(() => Int, { nullable: true })
  rating: number;
  @Field({ nullable: true })
  title: string;
  @Field(() => Int, { nullable: true })
  discount: number;
  @Field(() => Float, { nullable: true })
  originalPrice: Types.Decimal128 | number;
  @Field(() => Int, { nullable: true })
  quantity: number;
  @Field(() => [String])
  imgUrl: [];
  @Field(() => Category)
  category: Category;
  @Field()
  displayPrice: string;
  @Field({ nullable: true })
  createAt: Date;
  @Field({ nullable: true })
  updateAt: Date;
  @Field({ nullable: true })
  slug?: string;
  @HideField()
  keyword: string;
}

@ObjectType()
export class ResultSearch implements IResultFilter<Product> {
  @Field(() => [Product], { nullable: true })
  results: Product[];
  @Field(() => Int, { nullable: true })
  totalCount: number;
  @Field(() => Float, { nullable: true })
  minPrice?: Types.Decimal128 | number;
  @Field(() => Float, { nullable: true })
  maxPrice?: Types.Decimal128 | number;
  @Field(() => [String], { nullable: true })
  listKeyword?: string[];
}

@ObjectType()
export class OptionSort {
  @Field({ nullable: true })
  code: SortProductEnum;
  @Field({ nullable: true })
  title: string;
}
