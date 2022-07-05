import { Model } from 'mongoose';
import { OrderItemDocument } from './schemas/orderitem.schema';
import { CreateOrderItemInput } from './dto/orderitem.input';
export declare class OrderItemService {
    private orderItemModel;
    constructor(orderItemModel: Model<OrderItemDocument>);
    createOrderItem(input: CreateOrderItemInput): Promise<boolean>;
    getListProductIdInOrderItem(): Promise<string[]>;
}
