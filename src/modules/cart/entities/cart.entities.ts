import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { Product } from '../../product/entities/product.entities';

@ObjectType()
export class LineItem {
  @Field(() => Product)
  product: Product;
  @Field(() => Number)
  quantity: number;
  @Field(() => Number)
  totalPrice: number;
}
@ObjectType()
export class Cart {
  @Field(() => [LineItem])
  listItem: LineItem[];
  @Field(() => Int)
  totalPrice: number | Types.Decimal128;
}
