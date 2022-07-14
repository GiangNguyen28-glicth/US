import { CartService } from './cart.service';
import { Request, Response } from 'express';
import { CartInput } from './dto/cart.input';
export declare class CartResolver {
    private cartService;
    constructor(cartService: CartService);
    getListItemCart(req: Request): Promise<any>;
    addItemToCart(input: CartInput, req: Request, res: Response): Promise<boolean>;
    deleteItemCart(products: string[], req: Request, res: Response): Promise<boolean>;
    updateItemCart(input: CartInput, req: Request, res: Response): Promise<boolean>;
}
