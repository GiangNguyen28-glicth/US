import { Product } from '../product/entities/product.entities';
import { CartService } from './cart.service';
import { Response } from 'express';
export declare class CartResolver {
    private cartService;
    constructor(cartService: CartService);
    addItemToCart(productId: string, req: any, res: Response): Promise<Product[]>;
}
