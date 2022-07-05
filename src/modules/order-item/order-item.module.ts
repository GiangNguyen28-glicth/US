import { Module } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { OrderItemResolver } from './order-item.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderItem } from './entities/orderitem.entities';
import { OrderItemSchema } from './schemas/orderitem.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: OrderItem.name,
        useFactory: () => {
          OrderItemSchema.pre('save', function (next) {
            return next();
          });
          return OrderItemSchema;
        },
      },
    ]),
  ],
  providers: [OrderItemService, OrderItemResolver],
  exports: [OrderItemService],
})
export class OrderItemModule {}
