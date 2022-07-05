import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderItem } from './entities/orderitem.entities';
import { OrderItemDocument } from './schemas/orderitem.schema';
import { CreateOrderItemInput } from './dto/orderitem.input';
@Injectable()
export class OrderItemService {
  constructor(
    @InjectModel(OrderItem.name)
    private orderItemModel: Model<OrderItemDocument>,
  ) {}

  async createOrderItem(input: CreateOrderItemInput): Promise<boolean> {
    await this.orderItemModel.create({
      product: input.productId,
      order: input.orderId,
      quantity: input.quantity,
      totalPrice: input.totalPrice,
    });
    return true;
  }

  async getListProductIdInOrderItem(): Promise<string[]> {
    const listOrderItemAfterSort = await this.orderItemModel.aggregate([
      {
        $group: {
          _id: '$product',
          sum: { $sum: '$quantity' },
        },
      },
      {
        $sort: {
          sum: -1,
        },
      },
    ]);
    let listProductId: string[] = [];
    listOrderItemAfterSort.forEach(
      item => (listProductId = listProductId.concat(item._id.toString())),
    );
    return listProductId;
  }
}
