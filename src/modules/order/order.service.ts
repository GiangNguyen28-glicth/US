import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './entities/order.entities';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private oderModel: Model<Order>) {}
  async createOrder(): Promise<boolean> {
    return true;
  }
  async updateOrder(): Promise<boolean> {
    return true;
  }
  async getOne(orderid: string): Promise<Order> {
    const order = await this.oderModel.findOne({ _id: orderid });
    return order;
  }
}
