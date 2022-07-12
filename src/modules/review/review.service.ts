import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductService } from '../product/product.service';
import { User } from '../user/entities/user.entities';
import { ReviewInput } from './dto/review.input';
import { ProductReview } from './entities/review.entities';
import { ProductReviewDocument } from './schemas/review.schema';
import mongoose from 'mongoose';
@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(ProductReview.name)
    private productReviewModel: Model<ProductReviewDocument>,
    private productService: ProductService,
  ) {}
  async createReview(input: ReviewInput, user: User): Promise<boolean> {
    try {
      if (!(await this.productService.checkProductExists(input.productId))) {
        throw new HttpException(
          'Sản phẩm hiện không khả dụng',
          HttpStatus.NOT_FOUND,
        );
      }
      await this.productReviewModel.create({
        product: input.productId,
        user: user._id,
        rating: input.rating,
      });
      const averageRating: number = await this.averageRating(input.productId);
      await this.productService.updateProduct(input.productId, {
        rating: averageRating,
      });
      return true;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async countReview(productId: string): Promise<number> {
    if (!(await this.productService.checkProductExists(productId))) {
      throw new HttpException(
        'Sản phẩm hiện không khả dụng',
        HttpStatus.NOT_FOUND,
      );
    }
    return this.productReviewModel.find({ product: productId }).count();
  }

  async updateReview(input: ReviewInput, user: User): Promise<boolean> {
    try {
      const productReview = await this.productReviewModel.findOneAndUpdate(
        {
          product: input.productId,
          user: user._id,
        },
        { rating: input.rating },
      );
      const averageRating: number = await this.averageRating(input.productId);
      await this.productService.updateProduct(input.productId, {
        rating: averageRating,
      });
      return productReview ? true : false;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async checkExistsReview(productId: string, userId: string): Promise<boolean> {
    const review = await this.productReviewModel.findOne({
      product: productId,
      user: userId,
    });
    if (!review) {
      return false;
    }
    return true;
  }

  async averageRating(productId: string): Promise<number> {
    const totalrating = await this.productReviewModel.aggregate([
      {
        $match: {
          product: new mongoose.Types.ObjectId(productId),
        },
      },
      {
        $group: {
          _id: '$product',
          sum: { $sum: '$rating' },
          count: { $sum: 1 },
        },
      },
    ]);
    return totalrating[0]?.sum ? totalrating[0].sum / totalrating[0].count : 0;
  }
}
