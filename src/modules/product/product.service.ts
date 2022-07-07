import {
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, SortOrder } from 'mongoose';
import { Constants } from '../../constants/constants';
import { getFieldsInFilter, getQueryGetAll } from '../../utils/feature.utils';
import { checkCacheStore } from '../../utils/redis.utils';
import { CategoryService } from '../category/category.service';
import {
  CreateProductInput,
  FilterProductInput,
  SearchProductInput,
  UpdateProduct,
} from './dto/product.input';
import { Product } from './entities/product.entities';
import { ProductDocument } from './schemas/product.schema';
import { Cache } from 'cache-manager';
import { FilterProduct } from '../../constants/enum';
import { OrderItemService } from '../order-item/order-item.service';
import { sortQuery } from '../../constants/type';
@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
    private categoryService: CategoryService,
    private orderItemService: OrderItemService,
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
    // if (await checkCacheStore(this.cacheService, categoryId)) {
    //   return this.cacheService.get(categoryId);
    // }
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
    // this.cacheService.set(categoryId, listProducts);
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

  async getQuantityOfProduct(productId: string): Promise<number> {
    const product = await this.getProductById(productId);
    return product.quantity;
  }

  async updateProduct(
    productId: string,
    input: UpdateProduct,
  ): Promise<boolean> {
    const product = await this.productModel.findOneAndUpdate(
      { _id: productId },
      input,
    );
    if (!product) {
      throw new HttpException('Product ID không đúng', HttpStatus.NOT_FOUND);
    }
    return true;
  }

  async sortProduct(input: FilterProductInput): Promise<Product[]> {
    let products;
    if (input.filterby === FilterProduct.BESTSELLER) {
      const listProductId: string[] =
        await this.orderItemService.getListProductIdInOrderItem();
      products = await this.productModel.find({ _id: { $in: listProductId } });
    } else {
      Constants.generateSortOrder();
      const { property, option } = Constants.SortOrder[input.filterby];
      const query: sortQuery = {};
      query[property] = option as SortOrder;
      products = await this.productModel.find().sort(query);
    }
    return products;
  }

  async getProductByRangePrice(price: number): Promise<Product[]> {
    const products = await this.productModel.find({ price: { $lte: price } });
    return products;
  }

  async resetCache(): Promise<void> {
    await this.cacheService.reset();
  }
}
