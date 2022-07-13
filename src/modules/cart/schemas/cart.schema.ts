import { Document, Schema } from 'mongoose';
import { convertDecimal128ToString } from '../../../utils/feature.utils';
import { Cart } from '../entities/cart.entities';
import { LineItemSchema } from './lineitem.schema';

export type CartDocument = Cart & Document;
export const CartSchema = new Schema<Cart>(
  {
    listItem: [LineItemSchema],
    totalPrice: {
      type: Schema.Types.Decimal128,
      get: convertDecimal128ToString,
    },
  },
  { timestamps: true },
);
