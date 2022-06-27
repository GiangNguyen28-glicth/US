import { Model } from 'mongoose';
import { CreateProductInput } from './dto/product.input';
import { ProductDocument } from './schemas/product.schema';
export declare class ProductService {
    private productModel;
    constructor(productModel: Model<ProductDocument>);
    createProduct(input: CreateProductInput): Promise<boolean>;
}
