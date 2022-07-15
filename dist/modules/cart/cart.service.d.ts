import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { Product } from '../product/entities/product.entities';
import { ProductService } from '../product/product.service';
import { User } from '../user/entities/user.entities';
import { CartInput } from './dto/cart.input';
import { Cart, LineItem } from './entities/cart.entities';
import { CartDocument } from './schemas/cart.schema';
export declare class CartService {
    private cartModel;
    private productService;
    constructor(cartModel: Model<CartDocument>, productService: ProductService);
    addItemToCart(input: CartInput, user: User): Promise<boolean>;
    getListProducInCart(user: User): Promise<LineItem[]>;
    totalQuantity(req: Request): number;
    totalPrice(req: Request): number;
    isValidQuantityProduct(quantityAddToCart: number, product: Product, lineItem: LineItem[]): Promise<boolean>;
    isValidCart(lineItem: LineItem[]): Promise<boolean>;
    deleteItem(product: string[], user: User): Promise<boolean>;
    updateItem(input: CartInput, user: User): Promise<boolean>;
    getCartByUserId(user: User): Promise<Cart>;
    deleteCart(response: Response): Promise<void>;
    totalPriceOfItem(product: Product, quantity: number): number;
    checkCookie(cookie: any): boolean;
    optionCookie(req: Request): object;
    checkProductInLineItem(productId: string, listProduct: LineItem[]): boolean;
}
