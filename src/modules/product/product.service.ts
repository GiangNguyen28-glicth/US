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
import { checkCacheStore } from '../../utils/redis.utils';
import { CategoryService } from '../category/category.service';
import {
  CreateProductInput,
  OptionFilterProduct,
  SearchProductInput,
  SortProductInput,
  UpdateProduct,
} from './dto/product.input';
import { Product, ResultFilter } from './entities/product.entities';
import { ProductDocument } from './schemas/product.schema';
import { Cache } from 'cache-manager';
import { OrderItemService } from '../order-item/order-item.service';
import { sortQuery } from '../../constants/type';
import { faker } from '@faker-js/faker';
import { FilterProductBuilder } from '../../pattern/Builder/concreteBuilder';
import { getSkipValue, priceAfterDiscount } from '../../utils/feature.utils';
import { transformTextSearch } from '../../utils/string.utils';
import Decimal from 'decimal.js';
import { SortProductEnum } from '../../constants/enum';
@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    // @Inject(CACHE_MANAGER) private cacheService: Cache,
    private categoryService: CategoryService,
    private orderItemService: OrderItemService,
  ) {}
  async createProduct(input: CreateProductInput): Promise<boolean> {
    return this.productModel.create(input) ? true : false;
  }
  async getProducts(input: OptionFilterProduct): Promise<ResultFilter> {
    try {
      const query = new FilterProductBuilder()
        .addRangePrice(input.filter.minPrice, input.filter.maxPrice)
        .addDiscount(input.filter.isDiscount)
        .addProductId(input.filter.productId)
        .buildQuery();
      const skip: number | undefined = getSkipValue(input.page, input.size);
      const [products, listKeyword, totalCount] = await Promise.all([
        this.productModel.find(query).skip(skip).limit(input?.size),
        this.getKeyword(input.filter.name),
        this.getTotalCount(query),
      ]);
      return {
        results: products,
        listKeyword: listKeyword,
        totalCount: totalCount,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  getTotalCount(query: object): Promise<number> {
    return this.productModel.countDocuments(query).exec();
  }

  async getKeyword(name: string): Promise<string[]> {
    if (!name) {
      return [];
    }
    name = '^' + transformTextSearch(name);
    const prouducts = await this.productModel.find(
      {
        $and: [
          {
            keyword: {
              $regex: `${name}`,
              $options: 'i',
            },
          },
        ],
      },
      { _id: 0, name: 1 },
    );
    return prouducts.map(item => item.name);
  }

  async searchProduct(input: SearchProductInput): Promise<Product[]> {
    try {
      const query = new FilterProductBuilder().addName(input.name).buildQuery();
      const skip: number | undefined = getSkipValue(input.page, input.size);
      return this.productModel.find(query).skip(skip).limit(input.size).exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
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
    let listProducts: Product[] = await this.productModel.find({
      category: categoryId,
    });
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

  async getProductBySlug(slug: string): Promise<Product> {
    try {
      const product = await this.productModel.findOne({ slug: slug });
      return product;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async sortProduct(input: SortProductInput): Promise<Product[]> {
    let products;
    if (input.filterby === SortProductEnum.BESTSELLER) {
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

  async updatePrice(): Promise<boolean> {
    const products = await this.productModel.find();
    for (const i of products) {
      await this.productModel.findOneAndUpdate(
        { _id: i._id },
        {
          $set: {
            originalPrice: i.price,
            price: new Decimal(
              priceAfterDiscount(i.price, i.discount) as number,
            ),
          },
        },
      );
    }
    return true;
  }

  createRandomProduct(): CreateProductInput {
    return {
      name: faker.commerce.product(),
      discount: +faker.commerce.price(0, 10),
      category: '62ba7694f002a7e575034d5c',
      quantity: faker.datatype.number(20),
      title: faker.commerce.productDescription(),
      price: +faker.commerce.price(10000, 100000),
      imgUrl: [faker.image.cats()],
    };
  }
  async fakeDataProduct(): Promise<boolean> {
    for (let index = 0; index < 5; index++) {
      this.createProduct(this.createRandomProduct());
    }
    return true;
  }

  async resetCache(): Promise<void> {
    // await this.cacheService.reset();
  }
}
