import { CreateProductInput, SearchProductInput, UpdateProduct } from './dto/product.input';
import { OptionSort, Product, ResultSearch } from './entities/product.entities';
import { ProductService } from './product.service';
export declare class ProductResolver {
    private productService;
    constructor(productService: ProductService);
    resetCache(): Promise<string>;
    searchProduct(input: SearchProductInput): Promise<ResultSearch>;
    getProductBySlug(slug: string): Promise<Product>;
    getSortOption(): OptionSort[];
    createProduct(input: CreateProductInput): Promise<boolean>;
    updateProduct(input: UpdateProduct, productId: string): Promise<boolean>;
    fakeDataProduct(): Promise<boolean>;
}
