import { Document, Schema } from 'mongoose';
import { convertDecimal128ToString } from '../../../utils/feature.utils';
import { ref } from '../../../utils/ref.utils';
import { Category } from '../../category/entites/category.entities';
import { Product } from '../entities/product.entities';

export type ProductDocument = Product & Document;
export const ProductSchema = new Schema<Product>(
  {
    name: {
      type: String,
      trim: true,
    },
    price: {
      type: Schema.Types.Decimal128,
      min: [0, 'min is 0'],
      get: convertDecimal128ToString,
    },
    displayPrice: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      trim: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    originalPrice: {
      type: Schema.Types.Decimal128,
      min: [0, 'min is 0'],
      get: convertDecimal128ToString,
    },
    quantity: {
      type: Number,
    },
    imgUrl: [],
    category: ref(Category, { select: ['_id', 'name', 'code', '-parent'] }),
    slug: {
      type: String,
      unique: true,
    },
    keyword: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  },
);
