import { Model } from 'mongoose';
import { CategoryService } from '../category/category.service';
import { CreateProductInput, SearchProductInput } from './dto/product.input';
import { Product } from './entities/product.entities';
import { ProductDocument } from './schemas/product.schema';
import { Cache } from 'cache-manager';
export declare class ProductService {
    private productModel;
    private cacheService;
    private categoryService;
    constructor(productModel: Model<ProductDocument>, cacheService: Cache, categoryService: CategoryService);
    createProduct(input: CreateProductInput): Promise<boolean>;
    getAllProducts(): Promise<Product[]>;
    searchProduct(input: SearchProductInput): Promise<Product[]>;
    getProductByCategory(categoryId: string): Promise<Product[]>;
    getProductById(productId: string): Promise<Product>;
    checkProductExists(productId: string): Promise<boolean>;
    resetCache(): Promise<void>;
}
