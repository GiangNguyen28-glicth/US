import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './entities/order.entities';
import { Request, Response } from 'express';
import { CartService } from '../cart/cart.service';
import { CreateOrderInput } from './dto/order.input';
import { User } from '../user/entities/user.entities';
import { LineItem } from '../cart/entities/cart.entities';
import { ProductService } from '../product/product.service';
import { OrderItemService } from '../order-item/order-item.service';
import { FilterStatistics } from '../../constants/enum';
@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    private cartService: CartService,
    private productService: ProductService,
    private orderItemService: OrderItemService,
  ) {}
  async createOrder(
    input: CreateOrderInput,
    req: Request,
    res: Response,
    user: User,
  ): Promise<boolean> {
    const carts: LineItem[] = await this.cartService.getListProducInCart(req);
    const { username, phonenumber, address } = input;
    const totalPrice: number = this.cartService.totalPrice(req);
    const totalQuantity: number = this.cartService.totalQuantity(req);
    const isValidCart: boolean = await this.cartService.isValidCart(carts);
    if (isValidCart) {
      const order = await this.orderModel.create({
        user: user._id,
        username,
        phonenumber,
        address,
        totalQuantity,
        totalPrice,
      });
      Promise.all([
        this.updateQuantityProductAfterOrder(carts),
        ,
        this.createOrderItemAfterOrder(carts, order._id),
      ]);
      this.cartService.deleteCart(res);
    }
    return true;
  }

  async quantityProductAfterOrder(
    productId: string,
    quantityCart: number,
  ): Promise<number> {
    const product = await this.productService.getProductById(productId);
    const quantityProductAfterOrder: number = product.quantity - quantityCart;
    return quantityProductAfterOrder;
  }
  async updateQuantityProductAfterOrder(lineItem: LineItem[]): Promise<void> {
    for (const item of lineItem) {
      const quantityProductAfterOrder: number =
        await this.quantityProductAfterOrder(
          item.product._id.toString(),
          item.quantity,
        );
      await this.productService.updateProduct(item.product._id.toString(), {
        quantity: quantityProductAfterOrder,
      });
    }
  }
  async createOrderItemAfterOrder(
    lineItem: LineItem[],
    orderId: string,
  ): Promise<void> {
    for (const item of lineItem) {
      await this.orderItemService.createOrderItem({
        productId: item.product._id.toString(),
        orderId,
        quantity: item.quantity,
        totalPrice: item.totalPrice,
      });
    }
  }
  async updateOrder(): Promise<boolean> {
    return true;
  }
  async getOne(orderid: string): Promise<Order> {
    const order = await this.orderModel.findOne({ _id: orderid });
    return order;
  }
  async statisticOrder(
    startOfDate: Date,
    endOfDate: Date,
    optionFilter: string,
  ): Promise<any> {
    const option: object = this.checkIsMonthOrDate(optionFilter);
    const orders = await this.orderModel.aggregate([
      {
        $project: {
          totalPrice: 1,
          createdAt: 1,
          date: { $dayOfMonth: '$createdAt' },
          month: { $month: '$createdAt' },
          year: { $year: '$createdAt' },
        },
      },
      {
        $match: {
          createdAt: {
            $gte: startOfDate,
            $lte: endOfDate,
          },
        },
      },
      {
        $group: {
          _id: option,
          totalPrice: { $sum: '$totalPrice' },
        },
      },
      {
        $project: {
          _id: 0,
          totalPrice: 1,
          month: '$_id.month',
          date: '$_id.date',
          year: '$_id.year',
        },
      },
      {
        $sort: {
          month: 1,
        },
      },
    ]);
    return orders;
  }
  checkIsMonthOrDate(optionFilter: string): object {
    if (
      optionFilter === FilterStatistics.SEVENDAYSAGO ||
      optionFilter === FilterStatistics.THIRTYDAYSAGO
    ) {
      return {
        date: '$date',
        month: '$month',
      };
    }
    return {
      month: '$month',
      year: '$year',
    };
  }
}
