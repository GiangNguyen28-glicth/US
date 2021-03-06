import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateProductInput,
  SearchProductInput,
  UpdateProduct,
} from './dto/product.input';
import { OptionSort, Product, ResultSearch } from './entities/product.entities';
import { ProductService } from './product.service';

@Resolver(Product.name)
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Query(() => String)
  async resetCache(): Promise<string> {
    await this.productService.resetCache();
    return 'Success';
  }

  @Query(() => ResultSearch)
  searchProduct(
    @Args('search') input: SearchProductInput,
  ): Promise<ResultSearch> {
    return this.productService.searchProduct(input);
  }

  @Query(() => Product)
  getProductBySlug(@Args('slug') slug: string): Promise<Product> {
    return this.productService.getProductBySlug(slug);
  }

  @Query(() => [OptionSort])
  getSortOption(): OptionSort[] {
    return this.productService.getSortOption();
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
    return this.productService.fakeDataProduct();
  }
}
