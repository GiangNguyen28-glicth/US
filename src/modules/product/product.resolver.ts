import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateProductInput } from './dto/product.input';
import { ProductService } from './product.service';

@Resolver()
export class ProductResolver {
  constructor(private productService: ProductService) {}
  @Mutation(() => Boolean)
  async createProduct(
    @Args('input') input: CreateProductInput,
  ): Promise<boolean> {
    return this.productService.createProduct(input);
  }
}
