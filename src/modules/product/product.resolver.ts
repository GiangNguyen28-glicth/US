import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateProductInput,
  OptionFilterProduct,
  SearchProductInput,
  UpdateProduct,
} from './dto/product.input';
import { Product, ResultFilter } from './entities/product.entities';
import { ProductService } from './product.service';

@Resolver(Product.name)
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Query(() => ResultFilter)
  getProducts(
    @Args('option') input: OptionFilterProduct,
  ): Promise<ResultFilter> {
    return this.productService.getProducts(input);
  }

  @Query(() => [Product])
  getProductByCategory(
    @Args('categoryId') categoryId: string,
  ): Promise<Product[]> {
    return this.productService.getProductByCategory(categoryId);
  }

  @Query(() => String)
  async resetCache(): Promise<string> {
    await this.productService.resetCache();
    return 'Success';
  }

  @Query(() => ResultFilter)
  searchProduct(
    @Args('search') input: SearchProductInput,
  ): Promise<ResultFilter> {
    return this.productService.searchProduct(input);
  }

  @Query(() => Product)
  getProductBySlug(@Args('slug') slug: string): Promise<Product> {
    return this.productService.getProductBySlug(slug);
  }

  @Mutation(() => Boolean)
  createProduct(@Args('input') input: CreateProductInput): Promise<boolean> {
    return this.productService.createProduct(input);
  }

  @Mutation(() => Boolean)
  updateProduct(
    @Args('input') input: UpdateProduct,
    @Args('productId') productId: string,
  ): Promise<boolean> {
    return this.productService.updateProduct(productId, input);
  }
  @Query(() => Boolean)
  fakeDataProduct(): Promise<boolean> {
    return this.productService.updatePrice();
  }
}
