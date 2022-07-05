import { Model } from 'mongoose';
import { CategoryService } from '../category/category.service';
import { CreateProductInput, FilterProductInput, SearchProductInput, UpdateProduct } from './dto/product.input';
import { Product } from './entities/product.entities';
import { ProductDocument } from './schemas/product.schema';
import { Cache } from 'cache-manager';
import { OrderItemService } from '../order-item/order-item.service';
export declare class ProductService {
    private productModel;
    private cacheService;
    private categoryService;
    private orderItemService;
    constructor(productModel: Model<ProductDocument>, cacheService: Cache, categoryService: CategoryService, orderItemService: OrderItemService);
    createProduct(input: CreateProductInput): Promise<boolean>;
    getAllProducts(): Promise<Product[]>;
    searchProduct(input: SearchProductInput): Promise<Product[]>;
    getProductByCategory(categoryId: string): Promise<Product[]>;
    getProductById(productId: string): Promise<Product>;
    checkProductExists(productId: string): Promise<boolean>;
    getQuantityOfProduct(productId: string): Promise<number>;
    updateProduct(productId: string, input: UpdateProduct): Promise<boolean>;
    sortProduct(input: FilterProductInput): Promise<Product[]>;
    resetCache(): Promise<void>;
}
