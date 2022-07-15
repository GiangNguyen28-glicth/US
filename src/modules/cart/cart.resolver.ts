import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetUser } from '../../common/decorators/getuser.decorator';
import { AtGuard } from '../../common/guards/at.guard';
import { User } from '../user/entities/user.entities';
import { CartService } from './cart.service';
import { CartInput } from './dto/cart.input';
import { Cart, LineItem } from './entities/cart.entities';
@Resolver(Cart.name)
@UseGuards(AtGuard)
export class CartResolver {
  constructor(private cartService: CartService) {}

  @Query(() => [LineItem])
  async getListItemCart(@GetUser() user: User): Promise<any> {
    return this.cartService.getListProducInCart(user);
  }

  @Mutation(() => Boolean)
  async addItemToCart(
    @Args('input') input: CartInput,
    @GetUser() user: User,
  ): Promise<boolean> {
    return this.cartService.addItemToCart(input, user);
  }

  @Mutation(() => Boolean)
  async deleteItemCart(
    @Args('products', { type: () => [String] }) products: string[],

    @GetUser() user: User,
  ): Promise<boolean> {
    return this.cartService.deleteItem(products, user);
  }

  @Mutation(() => Boolean)
  async updateItemCart(
    @Args('input') input: CartInput,
    @GetUser() user: User,
  ): Promise<boolean> {
    return this.cartService.updateItem(input, user);
  }
}
