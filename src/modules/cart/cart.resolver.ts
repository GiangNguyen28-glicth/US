import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CartService } from './cart.service';
import { Request, Response } from 'express';
import { CartInput } from './dto/cart.input';
import { Cart, LineItem } from './entities/cart.entities';
import { UseGuards } from '@nestjs/common';
import { AtGuard } from '../../common/guards/at.guard';
@Resolver(Cart.name)
@UseGuards(AtGuard)
export class CartResolver {
  constructor(private cartService: CartService) {}

  @Query(() => [LineItem])
  async getListItemCart(@Context('req') req: Request): Promise<any> {
    return this.cartService.getListProducInCart(req);
  }

  @Mutation(() => Boolean)
  async addItemToCart(
    @Args('input') input: CartInput,
    @Context('req') req: Request,
    @Context('res') res: Response,
  ): Promise<boolean> {
    return this.cartService.addItemToCart(req, res, input);
  }

  @Mutation(() => Boolean)
  async deleteItemCart(
    @Args('products', { type: () => [String] }) products: string[],
    @Context('req') req: Request,
    @Context('res') res: Response,
  ): Promise<boolean> {
    return this.cartService.deleteItem(req, res, products);
  }

  @Mutation(() => Boolean)
  async updateItemCart(
    @Args('input') input: CartInput,
    @Context('req') req: Request,
    @Context('res') res: Response,
  ): Promise<boolean> {
    return this.cartService.updateItem(input, req, res);
  }
}
