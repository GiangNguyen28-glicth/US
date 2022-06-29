import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductInput, SearchProductInput } from './dto/product.input';
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
  @Mutation(() => Boolean)
  async createProduct(
    @Args('input') input: CreateProductInput,
  ): Promise<boolean> {
    return this.productService.createProduct(input);
  }
}
