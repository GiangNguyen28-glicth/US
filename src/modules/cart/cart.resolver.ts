import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Product } from '../product/entities/product.entities';
import { CartService } from './cart.service';
import { Request, Response } from 'express';
@Resolver()
export class CartResolver {
  constructor(private cartService: CartService) {}

  @Mutation(() => String)
  async addItemToCart(
    @Args('productId') productId: string,
    @Context('req') req,
    @Context('res') res: Response,
  ): Promise<string> {
    return this.cartService.addItemToCart(req, res, productId);
  }
}
