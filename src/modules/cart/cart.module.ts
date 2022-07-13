import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from '../product/product.module';
import { CartResolver } from './cart.resolver';
import { CartService } from './cart.service';
import { Cart } from './entities/cart.entities';
import { CartSchema } from './schemas/cart.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Cart.name,
        useFactory: () => {
          CartSchema.pre('save', function (next) {
            return next();
          });
          return CartSchema;
        },
      },
    ]),
    ProductModule,
  ],
  providers: [CartResolver, CartService],
  exports: [CartService],
})
export class CartModule {}
