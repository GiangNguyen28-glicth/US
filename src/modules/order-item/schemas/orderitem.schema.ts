import { Document, Schema } from 'mongoose';
import { OrderItem } from '../entities/orderitem.entities';

export type OrderItemDocument = OrderItem & Document;
export const OrderItemSchema = new Schema<OrderItem>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
    order: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
    },
    quantity: {
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
