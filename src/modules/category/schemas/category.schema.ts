import { Schema, Document, ObjectId } from 'mongoose';
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
  level: {
    type: Number,
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: Category.name,
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
