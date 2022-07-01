import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Order } from './entities/order.entities';
import { OrderSchema } from './schemas/order.schema';

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
  ],
  providers: [OrderService, OrderResolver],
})
export class OrderModule {}
