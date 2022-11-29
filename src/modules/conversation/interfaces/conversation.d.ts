import { Message } from '../../message/entities/message.entity';
import { User } from '../../user/entities/user.entities';

export interface IConversation extends IEntity {
  lastMessage?: string | Message;
  messagePin?: string | Message;
  members: string[] | User[];
}
