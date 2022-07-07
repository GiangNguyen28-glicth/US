import { Model } from 'mongoose';
import { Order } from './entities/order.entities';
import { Request, Response } from 'express';
import { CartService } from '../cart/cart.service';
import { CreateOrderInput } from './dto/order.input';
import { User } from '../user/entities/user.entities';
import { LineItem } from '../cart/entities/cart.entities';
import { ProductService } from '../product/product.service';
import { OrderItemService } from '../order-item/order-item.service';
export declare class OrderService {
    private orderModel;
    private cartService;
    private productService;
    private orderItemService;
    constructor(orderModel: Model<Order>, cartService: CartService, productService: ProductService, orderItemService: OrderItemService);
    createOrder(input: CreateOrderInput, req: Request, res: Response, user: User): Promise<boolean>;
    quantityProductAfterOrder(productId: string, quantityCart: number): Promise<number>;
    updateQuantityProductAfterOrder(lineItem: LineItem[]): Promise<void>;
    createOrderItemAfterOrder(lineItem: LineItem[], orderId: string): Promise<void>;
    updateOrder(): Promise<boolean>;
    getOne(orderid: string): Promise<Order>;
    statisticOrder(startOfDate: Date, endOfDate: Date, optionFilter: string): Promise<any>;
    checkIsMonthOrDate(optionFilter: string): object;
}
