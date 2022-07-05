import { CreateOrderInput } from './dto/order.input';
import { OrderService } from './order.service';
import { Request, Response } from 'express';
import { User } from '../user/entities/user.entities';
export declare class OrderResolver {
    private orderService;
    constructor(orderService: OrderService);
    createOrder(input: CreateOrderInput, req: Request, res: Response, user: User): Promise<boolean>;
}
