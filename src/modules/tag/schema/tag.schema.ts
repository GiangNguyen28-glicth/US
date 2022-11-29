import { Model, Schema } from 'mongoose';
import { TagType } from '../../../constants/enum';
import { Tag } from '../entities/tag.entity';

export type TagModelType = Model<Tag>;
export const TagSchema = new Schema<Tag>(
  {
    name: { type: String, trim: true },
    type: { type: String, trim: true, enum: Object.values(TagType) },
    parentType: { type: String, trim: true, enum: Object.values(TagType) },
    description: { type: String, trim: true },
    slug: { type: String, trim: true },
    keyword: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);
