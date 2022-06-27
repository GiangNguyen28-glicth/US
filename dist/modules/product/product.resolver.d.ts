import { CreateProductInput } from './dto/product.input';
import { ProductService } from './product.service';
export declare class ProductResolver {
    private productService;
    constructor(productService: ProductService);
    createProduct(input: CreateProductInput): Promise<boolean>;
}
