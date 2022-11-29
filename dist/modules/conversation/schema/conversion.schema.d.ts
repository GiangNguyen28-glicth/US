import { Model, Schema } from 'mongoose';
import { Conversation } from '../entities/conversation.entity';
export type ConversationModelType = Model<Conversation>;
export declare const ConversationSchema: Schema<Conversation, Model<Conversation, any, any, any, any>, {}, {}, {}, {}, "type", Conversation>;
