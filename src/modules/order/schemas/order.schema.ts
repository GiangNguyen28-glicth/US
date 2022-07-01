import { Document, Schema } from 'mongoose';
import { Order } from '../entities/order.entities';

export type OrderDocument = Order & Document;
export const OrderSchema = new Schema<Order>(
  {
    name: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
    },
    keyword: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);
