import { CreateProductInput, OptionFilterProduct, SearchProductInput, UpdateProduct } from './dto/product.input';
import { Product, ResultFilter } from './entities/product.entities';
import { ProductService } from './product.service';
export declare class ProductResolver {
    private productService;
    constructor(productService: ProductService);
    getProducts(input: OptionFilterProduct): Promise<ResultFilter>;
    getProductByCategory(categoryId: string): Promise<Product[]>;
    resetCache(): Promise<string>;
    searchProduct(input: SearchProductInput): Promise<Product[]>;
    getProductBySlug(slug: string): Promise<Product>;
    createProduct(input: CreateProductInput): Promise<boolean>;
    updateProduct(input: UpdateProduct, productId: string): Promise<boolean>;
    fakeDataProduct(): Promise<boolean>;
}
