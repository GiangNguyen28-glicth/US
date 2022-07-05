import { Resolver } from '@nestjs/graphql';
import { OrderItem } from './entities/orderitem.entities';

@Resolver(OrderItem.name)
export class OrderItemResolver {
  constructor() {}
}
