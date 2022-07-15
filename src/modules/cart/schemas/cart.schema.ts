import { Document, Schema } from 'mongoose';
import { convertDecimal128ToString } from '../../../utils/feature.utils';
import { ref } from '../../../utils/ref.utils';
import { User } from '../../user/entities/user.entities';
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
    user: ref(User, { select: ['-_id'] }),
  },
  { timestamps: true },
);
