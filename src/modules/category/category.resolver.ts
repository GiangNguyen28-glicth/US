import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { CategoryGetOneInput, CategoryInput } from './dto/category.input';
import { Category } from './entites/category.entities';

@Resolver(Category.name)
export class CategoryResolver {
  constructor(private categoryService: CategoryService) {}
  @Query(() => Category)
  async getCategoryById(
    @Args('input') input: CategoryGetOneInput,
  ): Promise<Category> {
    return this.categoryService.getOneCategory(input);
  }
  @Mutation(() => Boolean)
  async createCategory(@Args('input') input: CategoryInput): Promise<boolean> {
    return this.categoryService.createCategory(input);
  }
}
