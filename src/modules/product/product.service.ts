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
      const [queryFilter, querySort] = new FilterProductBuilder()
        .addRangePrice(input.filter.minPrice, input.filter.maxPrice)
        .addDiscount(input.filter.isDiscount)
        .addProductId(input.filter.productId)
        .addSortOption(input.sort)
        .buildQuery();
      const skip: number | undefined = getSkipValue(input.page, input.size);
      const [products, listKeyword, totalCount] = await Promise.all([
        this.productModel
          .find(queryFilter)
          .skip(skip)
          .limit(input?.size)
          .sort(querySort),
        this.getKeyword(input.filter.name),
        this.getTotalCount(queryFilter),
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

  async searchProduct(input: SearchProductInput): Promise<ResultFilter> {
    try {
      const query = new FilterProductBuilder().addName(input.name).buildQuery();
      const skip: number | undefined = getSkipValue(input.page, input.size);
      const query2 = await this.sortProduct(SortProductEnum.AZ);
      console.log(query2);
      const [products, totalCount, listKeyword] = await Promise.all([
        this.productModel
          .find(query)
          .skip(skip)
          .limit(input?.size)
          .sort(query2),
        this.getTotalCount(query),
        this.getKeyword(input.name),
      ]);
      return {
        results: products,
        totalCount: totalCount,
        listKeyword: listKeyword,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getProductByCategory(
    page: number,
    size: number,
    categoryId: string,
  ): Promise<ResultFilter> {
    const category = await this.categoryService.getOneCategory({
      _id: categoryId,
    });
    let listIdDescendants: string[] =
      await this.categoryService.getChildIdCategory(category._id.toString());
    listIdDescendants = listIdDescendants.concat(categoryId);
    const skip: number | undefined = getSkipValue(page, size);

    const [products, totalCount] = await Promise.all([
      this.productModel
        .find({
          category: { $in: listIdDescendants },
        })
        .skip(skip)
        .limit(size),
      this.getTotalCount({
        category: { $in: listIdDescendants },
      }),
    ]);
    return {
      results: products,
      totalCount: totalCount,
    };
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

  async sortProduct(input: SortProductEnum): Promise<any> {
    let products;
    const query: sortQuery = {};
    if (input === SortProductEnum.BESTSELLER) {
      const listProductId: string[] =
        await this.orderItemService.getListProductIdInOrderItem();
      products = await this.productModel.find({ _id: { $in: listProductId } });
    } else {
      Constants.generateSortOrder();
      const { property, option } = Constants.SortOrder[input];
      query[property] = option as SortOrder;
      // products = await this.productModel.find().sort(query);
    }
    return query;
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
    const data: any = [
      {
        name: 'Bodysuit Ba Lỗ Sơ Sinh Bé Gái Trắng Hoạ Tiết Chấm Bi',
        discount: +faker.commerce.price(0, 10),
        category: '62ba7663f002a7e575034d4d',
        quantity: faker.datatype.number(20),
        title: faker.commerce.productDescription(),
        price: 109000,
        imgUrl: [
          'https://traffic-edge12.cdn.vncdn.io/nvn/ncdn/store1/58863/ps/20220509/bodysuit_ba_lo_so_sinh_be_gai_trang_hoa_tiet_cham_bi_baa_baby_1.jpg',
        ],
      },
      {
        name: faker.commerce.product(),
        discount: +faker.commerce.price(0, 10),
        category: '62ba7694f002a7e575034d5c',
        quantity: faker.datatype.number(20),
        title: faker.commerce.productDescription(),
        price: +faker.commerce.price(10000, 100000),
        imgUrl: [faker.image.cats()],
      },
    ];
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
