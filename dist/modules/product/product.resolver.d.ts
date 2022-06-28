import { CreateProductInput } from './dto/product.input';
import { Product } from './entities/product.entities';
import { ProductService } from './product.service';
export declare class ProductResolver {
    private productService;
    constructor(productService: ProductService);
    createProduct(input: CreateProductInput): Promise<boolean>;
    getAllProducts(): Promise<Product[]>;
}
