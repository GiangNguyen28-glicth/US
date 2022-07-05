import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CartService } from './cart.service';
import { Request, Response } from 'express';
import { CreateCartInput } from './dto/cart.input';
import { Cart, LineItem } from './entities/cart.entities';
import { UseGuards } from '@nestjs/common';
import { AtGuard } from '../../common/guards/at.guard';
@Resolver(Cart.name)
export class CartResolver {
  constructor(private cartService: CartService) {}

  @Query(() => [LineItem])
  async getListItem(@Context('req') req: Request): Promise<any> {
    return this.cartService.getListProductInCookie(req);
  }

  @Mutation(() => Boolean)
  @UseGuards(AtGuard)
  async addItemToCart(
    @Args('input') input: CreateCartInput,
    @Context('req') req: Request,
    @Context('res') res: Response,
  ): Promise<boolean> {
    return this.cartService.addItemToCart(req, res, input);
  }

  @Mutation(() => Boolean)
  async deleteItem(
    @Args('productId') productId: string,
    @Context('req') req: Request,
    @Context('res') res: Response,
  ): Promise<boolean> {
    return this.cartService.deleteItem(req, res, productId);
  }

  @Mutation(() => Boolean)
  async updateItem(
    @Args('input') input: CreateCartInput,
    @Context('req') req: Request,
    @Context('res') res: Response,
  ): Promise<boolean> {
    return this.cartService.updateItem(input, req, res);
  }
}
