import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { CreateOrderInput } from './dto/order.input';
import { Order } from './entities/order.entities';
import { OrderService } from './order.service';
import { Request, Response } from 'express';
import { UseGuards } from '@nestjs/common';
import { AtGuard } from '../../common/guards/at.guard';
import { GetUser } from '../../common/decorators/getuser.decorator';
import { User } from '../user/entities/user.entities';
@Resolver(Order.name)
export class OrderResolver {
  constructor(private orderService: OrderService) {}
  @UseGuards(AtGuard)
  @Mutation(() => Boolean)
  async createOrder(
    @Args('input') input: CreateOrderInput,
    @Context('req') req: Request,
    @Context('res') res: Response,
    @GetUser() user: User,
  ): Promise<boolean> {
    return this.orderService.createOrder(input, req, res, user);
  }
}
