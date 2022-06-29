import { CreateProductInput, SearchProductInput } from './dto/product.input';
import { Product } from './entities/product.entities';
import { ProductService } from './product.service';
export declare class ProductResolver {
    private productService;
    constructor(productService: ProductService);
    getAllProducts(): Promise<Product[]>;
    searchProduct(input: SearchProductInput): Promise<Product[]>;
    getProductByCategory(categoryId: string): Promise<Product[]>;
    getProductById(productId: string): Promise<Product>;
    createProduct(input: CreateProductInput): Promise<boolean>;
}
