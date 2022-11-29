import { MessageType } from '../../../constants/enum';
import { Conversation } from '../../conversation/entities/conversation.entity';
import { User } from '../../user/entities/user.entities';

export interface IMessage extends IEntity {
  text: string;
  sender: string | User;
  receiver: string | User;
  conversion_id: string | Conversation;
  type: MessageType;
  urlMessageImage: string;
  cursor: number;
}

export type IMessageCreate = IEntityInput<
  IMessage,
  'cursor' | 'urlMessageImage'
>;
