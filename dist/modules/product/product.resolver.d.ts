import { CreateProductInput, FilterProductInput, SearchProductInput, UpdateProduct } from './dto/product.input';
import { Product } from './entities/product.entities';
import { ProductService } from './product.service';
export declare class ProductResolver {
    private productService;
    constructor(productService: ProductService);
    getAllProducts(): Promise<Product[]>;
    searchProduct(input: SearchProductInput): Promise<Product[]>;
    getProductByCategory(categoryId: string): Promise<Product[]>;
    getProductById(productId: string): Promise<Product>;
    resetCache(): Promise<string>;
    filterProduct(input: FilterProductInput): Promise<Product[]>;
    createProduct(input: CreateProductInput): Promise<boolean>;
    updateProduct(input: UpdateProduct, productId: string): Promise<boolean>;
}
