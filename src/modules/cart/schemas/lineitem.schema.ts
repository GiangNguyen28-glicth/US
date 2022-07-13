import { Document, Schema } from 'mongoose';
import { Product } from '../../product/entities/product.entities';
import { LineItem } from '../entities/cart.entities';
import { ref } from '../../../utils/ref.utils';
export type LineItemDocument = LineItem & Document;
export const LineItemSchema = new Schema<LineItem>({
  product: ref(Product, {
    select: ['_id', 'name', 'price', 'originalPrice', 'quantity'],
  }),
  quantity: {
    type: Number,
  },
  totalPrice: {
    type: Number,
  },
});
