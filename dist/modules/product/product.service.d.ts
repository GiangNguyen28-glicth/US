import { Model } from 'mongoose';
import { CategoryService } from '../category/category.service';
import { OrderItemService } from '../order-item/order-item.service';
import { CreateProductInput, SearchProductInput, UpdateProduct } from './dto/product.input';
import { Product, ResultSearch } from './entities/product.entities';
import { ProductDocument } from './schemas/product.schema';
export declare class ProductService {
    private productModel;
    private categoryService;
    private orderItemService;
    constructor(productModel: Model<ProductDocument>, categoryService: CategoryService, orderItemService: OrderItemService);
    createProduct(input: CreateProductInput): Promise<boolean>;
    getTotalCount(query: object): Promise<number>;
    getKeyword(name: string): Promise<string[]>;
    searchProduct(input: SearchProductInput): Promise<ResultSearch>;
    getlistIdDescendants(categoryId: string): Promise<string[]>;
    getMinMaxPrice(products: Product[]): [number, number];
    getProductById(productId: string): Promise<Product>;
    checkProductExists(productId: string): Promise<boolean>;
    getQuantityOfProduct(productId: string): Promise<number>;
    updateProduct(productId: string, input: UpdateProduct): Promise<boolean>;
    getProductBySlug(slug: string): Promise<Product>;
    updatePrice(): Promise<boolean>;
    createRandomProduct(): CreateProductInput;
    fakeDataProduct(): Promise<boolean>;
    resetCache(): Promise<void>;
}
