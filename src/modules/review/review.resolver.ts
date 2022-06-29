import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetUser } from '../../common/decorators/getuser.decorator';
import { AtGuard } from '../../common/guards/at.guard';
import { User } from '../user/entities/user.entities';
import { ReviewInput } from './dto/review.input';
import { ProductReview } from './entities/review.entities';
import { ReviewService } from './review.service';

@Resolver(ProductReview.name)
export class ReviewResolver {
  constructor(private reviewService: ReviewService) {}

  @Query(() => Boolean)
  @UseGuards(AtGuard)
  async checkExistsReview(
    @Args('productId') productId: string,
    @GetUser() user: User,
  ): Promise<boolean> {
    return this.reviewService.checkExistsReview(productId, user._id);
  }
  @Query(() => Number)
  async countReview(@Args('productId') productId: string): Promise<number> {
    return this.reviewService.countReview(productId);
  }

  @Mutation(() => Boolean)
  @UseGuards(AtGuard)
  async createReview(
    @Args('input') reviewInput: ReviewInput,
    @GetUser() user: User,
  ): Promise<boolean> {
    return this.reviewService.createReview(reviewInput, user);
  }

  @Mutation(() => Boolean)
  @UseGuards(AtGuard)
  async updateReview(
    @Args('input') input: ReviewInput,
    @GetUser() user: User,
  ): Promise<boolean> {
    return this.reviewService.updateReview(input, user);
  }
}
