import { Module } from '@nestjs/common';
import { ProductModule } from '../product/product.module';
import { CartResolver } from './cart.resolver';
import { CartService } from './cart.service';

@Module({
  imports: [ProductModule],
  providers: [CartResolver, CartService],
})
export class CartModule {}
