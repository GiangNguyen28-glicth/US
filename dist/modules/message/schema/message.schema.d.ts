import { Model, Schema } from 'mongoose';
import { Message } from '../entities/message.entity';
export type MessageModelType = Model<Message>;
export declare const MessageSchema: Schema<Message, Model<Message, any, any, any, any>, {}, {}, {}, {}, "type", Message>;
