import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductInput } from './dto/product.input';
import { Product } from './entities/product.entities';
import { ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}
  async createProduct(input: CreateProductInput): Promise<boolean> {
    return this.productModel.create(input) ? true : false;
  }
}
