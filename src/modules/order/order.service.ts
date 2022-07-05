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
@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private oderModel: Model<Order>,
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
    const carts: LineItem[] = await this.cartService.getListProductInCookie(
      req,
    );
    const { username, phonenumber, address } = input;
    const totalPrice: number = this.cartService.totalPrice(req);
    const totalQuantity: number = this.cartService.totalQuantity(req);
    const isValidCart: boolean = await this.cartService.isValidCart(carts);
    if (isValidCart) {
      const order = await this.oderModel.create({
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
    const order = await this.oderModel.findOne({ _id: orderid });
    return order;
  }
}
