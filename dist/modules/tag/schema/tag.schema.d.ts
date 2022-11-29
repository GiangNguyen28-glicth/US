import { Model, Schema } from 'mongoose';
import { Tag } from '../entities/tag.entity';
export type TagModelType = Model<Tag>;
export declare const TagSchema: Schema<Tag, Model<Tag, any, any, any, any>, {}, {}, {}, {}, "type", Tag>;
