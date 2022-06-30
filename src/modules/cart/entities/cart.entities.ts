import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Product } from '../../product/entities/product.entities';

@ObjectType()
export class Cart {
  @Field(() => [Product])
  listProduct: Product[];
  @Field(() => Int)
  totalPrice: number;
}
