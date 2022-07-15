import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { Product } from '../../product/entities/product.entities';
import { User } from '../../user/entities/user.entities';

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
  @Field(() => ID, { nullable: true })
  _id: string;
  @Field(() => [LineItem])
  listItem: LineItem[];
  @Field(() => Int)
  totalPrice: number | Types.Decimal128;
  @Field(() => User)
  user: User;
}
