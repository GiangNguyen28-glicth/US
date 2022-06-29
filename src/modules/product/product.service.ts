import {
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Constants } from '../../constants/constants';
import { getFieldsInFilter, getQueryGetAll } from '../../utils/feature.utils';
import { checkCacheStore } from '../../utils/redis.utils';
import { CategoryService } from '../category/category.service';
import { CreateProductInput, SearchProductInput } from './dto/product.input';
import { Product } from './entities/product.entities';
import { ProductDocument } from './schemas/product.schema';
import { Cache } from 'cache-manager';
@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
    private categoryService: CategoryService,
  ) {}
  async createProduct(input: CreateProductInput): Promise<boolean> {
    return this.productModel.create(input) ? true : false;
  }
  async getAllProducts(): Promise<Product[]> {
    return this.productModel.find();
  }
  async searchProduct(input: SearchProductInput): Promise<Product[]> {
    const searchInput = input?.name ? input.name : '';
    delete input.name;
    const fields = getFieldsInFilter(input);
    const query = getQueryGetAll('keyword', searchInput, fields);
    const product: Product[] = await this.productModel.find(query).exec();
    return product;
  }
  async getProductByCategory(categoryId: string): Promise<Product[]> {
    if (
      await checkCacheStore(
        this.cacheService,
        Constants.KEY_PRODUCT_BY_CATEGORY,
      )
    ) {
      return this.cacheService.get(Constants.KEY_PRODUCT_BY_CATEGORY);
    }
    const category = await this.categoryService.getOneCategory({
      _id: categoryId,
    });
    const listIdDescendants: string[] =
      await this.categoryService.getChildIdCategory(category._id.toString());
    let listProducts: Product[] = [];
    for (let i = 0; i < listIdDescendants.length; i++) {
      const products = await this.productModel.find({
        category: listIdDescendants[i],
      });
      listProducts = listProducts.concat(products);
    }
    console.log(listProducts);
    this.cacheService.set(Constants.KEY_PRODUCT_BY_CATEGORY, listProducts);
    return listProducts;
  }

  async getProductById(productId: string): Promise<Product> {
    const product = await this.productModel.findOne({ _id: productId });
    if (!product) {
      throw new HttpException('Không tìm thấy Product', HttpStatus.NOT_FOUND);
    }
    return product;
  }

  async checkProductExists(productId: string): Promise<boolean> {
    const product = await this.productModel.findOne({ _id: productId });
    if (!product) {
      return false;
    }
    return true;
  }

  async resetCache(): Promise<void> {
    await this.cacheService.reset();
  }
}
