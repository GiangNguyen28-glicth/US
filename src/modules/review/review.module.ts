import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from '../product/product.module';
import { ProductReview } from './entities/review.entities';
import { ReviewResolver } from './review.resolver';
import { ReviewService } from './review.service';
import { ProductReviewSchema } from './schemas/review.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: ProductReview.name,
        useFactory: () => {
          ProductReviewSchema.pre('save', function (next) {
            return next();
          });
          return ProductReviewSchema;
        },
      },
    ]),
    ProductModule,
  ],
  providers: [ReviewResolver, ReviewService],
})
export class ReviewModule {}
