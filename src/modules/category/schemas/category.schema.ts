import { Schema, Document } from 'mongoose';
import { CategoryEnum } from '../../../constants/enum';
import { Category } from '../entites/category.entities';

export type CategoryDocument = Category & Document;
export const CategorySchema = new Schema<Category>({
  code: {
    type: String,
    enum: Object.values(CategoryEnum),
  },
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
});
