import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '../common/dto/common.dto';
import { CreateTagInput, FilterGetAllTag } from './dto/create-tag.input';
import { Tag, TagResult } from './entities/tag.entity';
import { TagService } from './tag.service';

@Resolver(() => Tag)
export class TagResolver {
  constructor(private readonly tagService: TagService) {}

  @Mutation(() => Boolean)
  createTag(@Args('createTagInput') createTagInput: CreateTagInput) {
    return this.tagService.create(createTagInput);
  }

  @Query(() => TagResult)
  getAllTag(
    @Args('pagination', { type: () => PaginationInput, nullable: true })
    pagination: PaginationInput,
    @Args('filter', { type: () => FilterGetAllTag, nullable: true })
    filter: FilterGetAllTag,
  ): Promise<TagResult> {
    return this.tagService.findAll(pagination, filter);
  }

  @Query(() => Boolean)
  async createMultiTag(): Promise<boolean> {
    await Promise.all([
      this.tagService.createTagPassion(),
      this.tagService.createTagDiet(),
      this.tagService.createTagEducation(),
      this.tagService.createTagPersonality(),
      this.tagService.createTagPet(),
      this.tagService.createTagSmokeQuestion(),
    ]);
    return true;
  }
}
