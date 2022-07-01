import { Model } from 'mongoose';
import { Order } from './entities/order.entities';
export declare class OrderService {
    private oderModel;
    constructor(oderModel: Model<Order>);
    createOrder(): Promise<boolean>;
    updateOrder(): Promise<boolean>;
    getOne(orderid: string): Promise<Order>;
}
