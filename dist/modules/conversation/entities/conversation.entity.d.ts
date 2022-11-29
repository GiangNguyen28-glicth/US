import { Message } from '../../message/entities/message.entity';
import { User } from '../../user/entities/user.entities';
import { IConversation } from '../interfaces/conversation';
export declare class Conversation implements IConversation {
    _id: string;
    lastMessage: Message;
    messagePin: Message;
    members: User[];
    user: User;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare class ConversationResult implements IResult<Conversation> {
    results: Conversation[];
    totalCount: number;
}
