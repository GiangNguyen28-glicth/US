import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Order } from '../../order/entities/order.entities';
import { Product } from '../../product/entities/product.entities';

@ObjectType()
export class OrderItem {
  @Field(() => ID)
  _id: string;
  @Field(() => Product)
  product: Product;
  @Field(() => Order)
  order: Order;
  @Field(() => Number)
  quantity: number;
  @Field(() => Number)
  totalPrice: number;
  @Field(() => Date)
  createAt: Date;
  @Field(() => Date)
  updateAt: Date;
}
