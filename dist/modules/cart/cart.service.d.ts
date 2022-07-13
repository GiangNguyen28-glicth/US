import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { Product } from '../product/entities/product.entities';
import { ProductService } from '../product/product.service';
import { CartInput } from './dto/cart.input';
import { Cart, LineItem } from './entities/cart.entities';
import { CartDocument } from './schemas/cart.schema';
export declare class CartService {
    private cartModel;
    private productService;
    constructor(cartModel: Model<CartDocument>, productService: ProductService);
    addItemToCart(req: Request, res: Response, input: CartInput): Promise<boolean>;
    getListProducInCart(request: Request): Promise<LineItem[]>;
    totalQuantity(req: Request): number;
    totalPrice(req: Request): number;
    isValidQuantityProduct(quantityAddToCart: number, product: Product, lineItem: LineItem[]): Promise<boolean>;
    isValidCart(lineItem: LineItem[]): Promise<boolean>;
    deleteItem(req: Request, res: Response, productId: string): Promise<boolean>;
    updateItem(input: CartInput, req: Request, res: Response): Promise<boolean>;
    getCartById(cartId: string): Promise<Cart>;
    deleteCart(response: Response): Promise<void>;
    totalPriceOfItem(product: Product, quantity: number): number;
    checkCookie(cookie: any): boolean;
    optionCookie(req: Request): object;
    checkProductInLineItem(productId: string, listProduct: LineItem[]): boolean;
}
