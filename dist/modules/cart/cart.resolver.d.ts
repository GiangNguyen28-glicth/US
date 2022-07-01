import { CartService } from './cart.service';
import { Request, Response } from 'express';
import { CreateCartInput } from './dto/cart.input';
export declare class CartResolver {
    private cartService;
    constructor(cartService: CartService);
    getListItem(req: Request): Promise<any>;
    addItemToCart(input: CreateCartInput, req: Request, res: Response): Promise<boolean>;
    deleteItem(productId: string, req: Request, res: Response): Promise<boolean>;
    updateItem(input: CreateCartInput, req: Request, res: Response): Promise<boolean>;
}
