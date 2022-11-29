import { Model, Schema } from 'mongoose';
import { UserEmbedded } from '../entities/user_embedded.entity';
export type UserEmbeddedModelType = Model<UserEmbedded>;
export declare const UserEmbeddedSchema: Schema<UserEmbedded, Model<UserEmbedded, any, any, any, any>, {}, {}, {}, {}, "type", UserEmbedded>;
