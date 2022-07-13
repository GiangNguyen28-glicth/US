import { Model } from 'mongoose';
import { CategoryService } from '../category/category.service';
import { CreateProductInput, OptionFilterProduct, SearchProductInput, SortProductInput, UpdateProduct } from './dto/product.input';
import { Product, ResultFilter } from './entities/product.entities';
import { ProductDocument } from './schemas/product.schema';
import { OrderItemService } from '../order-item/order-item.service';
export declare class ProductService {
    private productModel;
    private categoryService;
    private orderItemService;
    constructor(productModel: Model<ProductDocument>, categoryService: CategoryService, orderItemService: OrderItemService);
    createProduct(input: CreateProductInput): Promise<boolean>;
    getProducts(input: OptionFilterProduct): Promise<ResultFilter>;
    getTotalCount(query: object): Promise<number>;
    getKeyword(name: string): Promise<string[]>;
    searchProduct(input: SearchProductInput): Promise<ResultFilter>;
    getProductByCategory(categoryId: string): Promise<Product[]>;
    getProductById(productId: string): Promise<Product>;
    checkProductExists(productId: string): Promise<boolean>;
    getQuantityOfProduct(productId: string): Promise<number>;
    updateProduct(productId: string, input: UpdateProduct): Promise<boolean>;
    getProductBySlug(slug: string): Promise<Product>;
    sortProduct(input: SortProductInput): Promise<Product[]>;
    updatePrice(): Promise<boolean>;
    createRandomProduct(): CreateProductInput;
    fakeDataProduct(): Promise<boolean>;
    resetCache(): Promise<void>;
}
