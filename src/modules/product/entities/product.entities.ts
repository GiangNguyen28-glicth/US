import { Field, Float, HideField, ID, Int, ObjectType } from '@nestjs/graphql';
import { ObjectIDResolver } from 'graphql-scalars';
import { Schema } from 'mongoose';

@ObjectType()
export class Product {
  @Field(() => ID)
  _id: string;
  @Field({ nullable: true })
  name?: string;
  @Field(() => Float)
  price?: Schema.Types.Decimal128;
  @Field(() => Int, { nullable: true })
  rating?: number;
  @Field({ nullable: true })
  title?: string;
  @Field(() => Int, { nullable: true })
  discount: number;
  @Field(() => Int, { nullable: true })
  quantity: number;
  @Field(() => [String])
  imgUrl: [];
  @Field(() => ObjectIDResolver)
  categoryId: string;
  @Field()
  displayPrice: string;
  @Field({ nullable: true })
  createAt: Date;
  @Field({ nullable: true })
  updateAt: Date;
  @HideField()
  slug: string;
  @HideField()
  keyword: string;
}
