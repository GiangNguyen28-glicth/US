import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateProductInput,
  FilterProductInput,
  SearchProductInput,
  UpdateProduct,
} from './dto/product.input';
import { Product } from './entities/product.entities';
import { ProductService } from './product.service';

@Resolver(Product.name)
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Query(() => [Product])
  async getAllProducts(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }

  @Query(() => [Product])
  async searchProduct(
    @Args('input') input: SearchProductInput,
  ): Promise<Product[]> {
    return this.productService.searchProduct(input);
  }

  @Query(() => [Product])
  async getProductByCategory(
    @Args('categoryId') categoryId: string,
  ): Promise<Product[]> {
    return this.productService.getProductByCategory(categoryId);
  }

  @Query(() => Product)
  async getProductById(@Args('productId') productId: string): Promise<Product> {
    return this.productService.getProductById(productId);
  }

  @Query(() => String)
  async resetCache(): Promise<string> {
    this.productService.resetCache();
    return 'Success';
  }

  @Query(() => [Product])
  async filterProduct(
    @Args('input') input: FilterProductInput,
  ): Promise<Product[]> {
    return this.productService.sortProduct(input);
  }

  @Mutation(() => Boolean)
  async createProduct(
    @Args('input') input: CreateProductInput,
  ): Promise<boolean> {
    return this.productService.createProduct(input);
  }

  @Mutation(() => Boolean)
  async updateProduct(
    @Args('input') input: UpdateProduct,
    @Args('productId') productId: string,
  ): Promise<boolean> {
    return this.productService.updateProduct(productId, input);
  }
}
