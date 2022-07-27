import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NeedPermission } from '../../common/decorators/permission.decorator';
import { hasRoles } from '../../common/decorators/role.decorator';
import { AtGuard } from '../../common/guards/at.guard';
import { PermissionGuard } from '../../common/guards/authorization.guard';
import { RolesGuard } from '../../common/guards/role.guard';
import { Permission, RoleEnum } from '../../constants/enum';
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
  @hasRoles(RoleEnum.ADMIN)
  @NeedPermission(Permission.FULL, Permission.READ_PRODUCT)
  @UseGuards(AtGuard, RolesGuard, PermissionGuard)
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
  async fakeDataProduct(): Promise<boolean> {
    await this.productService.resetCache();
    return true;
  }
}
