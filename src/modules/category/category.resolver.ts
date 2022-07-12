import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import {
  CategoryGetByParentAndLevel,
  CategoryGetOneInput,
  CategoryInput,
} from './dto/category.input';
import { Category } from './entites/category.entities';

@Resolver(Category.name)
export class CategoryResolver {
  constructor(private categoryService: CategoryService) {}

  @Query(() => Category)
  getChildOfCategory(
    @Args('categoryId') categoryId: string,
  ): Promise<Category> {
    return this.categoryService.getChildOfCategory(categoryId);
  }

  @Query(() => [String])
  getChildIdCategory(
    @Args('categoryId') categoryId: string,
  ): Promise<string[]> {
    return this.categoryService.getChildIdCategory(categoryId);
  }

  @Query(() => [Category])
  getCategoryByParentIdAndLevel(
    @Args('input') input: CategoryGetByParentAndLevel,
  ): Promise<Category[]> {
    return this.categoryService.getCategoryByParentIdAndLevel(input);
  }
  @Query(() => Category)
  getCategoryById(
    @Args('input') input: CategoryGetOneInput,
  ): Promise<Category> {
    return this.categoryService.getOneCategory(input);
  }

  @Mutation(() => Boolean)
  createCategory(@Args('input') input: CategoryInput): Promise<boolean> {
    return this.categoryService.createCategory(input);
  }
}
