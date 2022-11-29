import { Schema } from 'mongoose';
import { Image } from '../entities/common.entities';

export const ImageSchema = new Schema<Image>(
  {
    default: {
      type: String,
      trim: true,
    },
    small: {
      type: String,
      trim: true,
    },
    medium: {
      type: String,
      trim: true,
    },
    base64: {
      type: String,
      trim: true,
    },
    alt: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { _id: false },
);
