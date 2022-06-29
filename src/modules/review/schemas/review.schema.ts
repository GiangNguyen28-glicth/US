import { ProductReview } from '../entities/review.entities';
import { Document, Schema } from 'mongoose';
import { Product } from '../../product/entities/product.entities';
export type ProductReviewDocument = ProductReview & Document;
export const ProductReviewSchema = new Schema<ProductReview>({
  product: {
    type: Schema.Types.ObjectId,
    ref: Product.name,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  rating: {
    max: [5, 'Không được đánh giá quá 5 sao'],
    type: Number,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
  updateAt: {
    type: Date,
  },
});
