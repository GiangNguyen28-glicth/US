import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductInput } from './dto/product.input';
import { Product } from './entities/product.entities';
import { ProductService } from './product.service';

@Resolver(Product.name)
export class ProductResolver {
  constructor(private productService: ProductService) {}
  @Mutation(() => Boolean)
  async createProduct(
    @Args('input') input: CreateProductInput,
  ): Promise<boolean> {
    return this.productService.createProduct(input);
  }
  @Query(() => [Product])
  async getAllProducts(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }
}
