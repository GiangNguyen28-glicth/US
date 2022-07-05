import { Request, Response } from 'express';
import { Product } from '../product/entities/product.entities';
import { ProductService } from '../product/product.service';
import { CreateCartInput } from './dto/cart.input';
import { LineItem } from './entities/cart.entities';
export declare class CartService {
    private productService;
    constructor(productService: ProductService);
    addItemToCart(req: Request, res: Response, input: CreateCartInput): Promise<boolean>;
    getListProductInCookie(request: Request): Promise<LineItem[]>;
    totalQuantity(req: Request): number;
    totalPrice(req: Request): number;
    isValidQuantityProduct(quantityAddToCart: number, product: Product, lineItem: LineItem[]): Promise<boolean>;
    isValidCart(lineItem: LineItem[]): Promise<boolean>;
    deleteItem(req: Request, res: Response, productId: string): Promise<boolean>;
    updateItem(input: CreateCartInput, req: Request, res: Response): Promise<boolean>;
    deleteCart(response: Response): void;
    totalPriceOfItem(product: Product, quantity: number): number;
    checkCookie(cookie: any): boolean;
    optionCookie(req: Request): object;
    checkProductInLineItem(productId: string, listProduct: LineItem[]): boolean;
}
