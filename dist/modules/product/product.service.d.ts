import { Model } from 'mongoose';
import { CategoryService } from '../category/category.service';
import { CreateProductInput, SearchProductInput } from './dto/product.input';
import { Product } from './entities/product.entities';
import { ProductDocument } from './schemas/product.schema';
export declare class ProductService {
    private productModel;
    private categoryService;
    constructor(productModel: Model<ProductDocument>, categoryService: CategoryService);
    createProduct(input: CreateProductInput): Promise<boolean>;
    getAllProducts(): Promise<Product[]>;
    searchProduct(input: SearchProductInput): Promise<Product[]>;
    getProductByCategory(categoryId: string): Promise<Product[]>;
    getProductById(productId: string): Promise<Product>;
}
