import { Document, Schema } from 'mongoose';
import { User } from '../../user/entities/user.entities';
import { Order } from '../entities/order.entities';

export type OrderDocument = Order & Document;
export const OrderSchema = new Schema<Order>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: User.name,
    },
    address: {
      type: String,
      trim: true,
    },
    totalQuantity: {
      type: Number,
    },
    totalPrice: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);
