import { faker } from '@faker-js/faker';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import Decimal from 'decimal.js';
import { Model } from 'mongoose';
import { SortProductEnum } from '../../constants/enum';
import { FilterProductBuilder } from '../../pattern/Builder/concreteBuilder';
import { getSkipValue, priceAfterDiscount } from '../../utils/feature.utils';
import { transformTextSearch } from '../../utils/string.utils';
import { CategoryService } from '../category/category.service';
import { OrderItemService } from '../order-item/order-item.service';
import {
  CreateProductInput,
  SearchProductInput,
  UpdateProduct,
} from './dto/product.input';
import { Product, ResultSearch } from './entities/product.entities';
import { ProductDocument } from './schemas/product.schema';
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

  async searchProduct(input: SearchProductInput): Promise<ResultSearch> {
    try {
      let listIdDescendants: string[] = [];
      let listIdProducts: string[] = [];
      if (input.filter.categoryId) {
        listIdDescendants = await this.getlistIdDescendants(
          input.filter.categoryId,
        );
      }
      if (input.sort === SortProductEnum.BESTSELLER) {
        listIdProducts =
          await this.orderItemService.getListProductIdInOrderItem();
        console.log(listIdProducts);
      }
      const [queryFilter, querySort] = new FilterProductBuilder()
        .addName(input.filter.name)
        .addRangePrice(input.filter.minPrice, input.filter.maxPrice)
        .addDiscount(input.filter.isDiscount)
        .addProductId(input.filter.productId)
        .addCategoryId(listIdDescendants)
        .addSortOption(input.sort, listIdProducts)
        .buildQuery();
      const skip: number | undefined = getSkipValue(input.page, input.size);
      const [products, totalCount, listKeyword] = await Promise.all([
        this.productModel
          .find(queryFilter)
          .skip(skip)
          .limit(input?.size)
          .sort(querySort),
        this.getTotalCount(queryFilter),
        this.getKeyword(input.filter.name),
      ]);
      const [minPrice, maxPrice] = this.getMinMaxPrice(products);
      return {
        results: products,
        totalCount: totalCount,
        listKeyword: listKeyword,
        minPrice: minPrice,
        maxPrice: maxPrice,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getlistIdDescendants(categoryId: string): Promise<string[]> {
    let listIdDescendants: string[] = [];
    if (categoryId) {
      listIdDescendants = listIdDescendants.concat(categoryId);
      const category = await this.categoryService.getOneCategory({
        _id: categoryId,
      });
      listIdDescendants = await this.categoryService.getChildIdCategory(
        category._id.toString(),
      );
    }
    return listIdDescendants;
  }

  getMinMaxPrice(products: Product[]): [number, number] {
    if (products.length === 0) {
      return [0, 0];
    }
    const maxPrice: number = Math.max(
      ...products.map(item => item.price as number),
    );
    const minPrice: number = Math.min(
      ...products.map(item => item.price as number),
    );
    return [minPrice, maxPrice];
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
        category: '62ba7b947310db5018d57aad',
        quantity: faker.datatype.number(20),
        title: faker.commerce.productDescription(),
        price: +faker.commerce.price(10000, 100000),
        imgUrl: [faker.image.cats()],
      },
    ];
    return {
      name: faker.commerce.product(),
      discount: +faker.commerce.price(0, 10),
      category: '62ba7b947310db5018d57aad',
      quantity: faker.datatype.number(20),
      title: faker.commerce.productDescription(),
      price: +faker.commerce.price(10000, 100000),
      imgUrl: [faker.image.cats()],
    };
  }
  async fakeDataProduct(): Promise<boolean> {
    for (let index = 0; index < 10; index++) {
      this.createProduct(this.createRandomProduct());
    }
    return true;
  }

  async resetCache(): Promise<void> {
    // await this.cacheService.reset();
  }
}
