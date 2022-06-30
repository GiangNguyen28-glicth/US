import { ProductService } from '../product/product.service';
export declare class CartService {
    private productService;
    constructor(productService: ProductService);
    addItemToCart(req: any, res: any, productId: string): Promise<string>;
}
