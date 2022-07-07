import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Order } from './entities/order.entities';
import { OrderSchema } from './schemas/order.schema';
import { CartModule } from '../cart/cart.module';
import { ProductModule } from '../product/product.module';
import { OrderItemModule } from '../order-item/order-item.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Order.name,
        useFactory: () => {
          OrderSchema.pre('save', function (next) {
            return next();
          });
          return OrderSchema;
        },
      },
    ]),
    CartModule,
    ProductModule,
    OrderItemModule,
  ],
  providers: [OrderService, OrderResolver],
  exports: [OrderService],
})
export class OrderModule {}
