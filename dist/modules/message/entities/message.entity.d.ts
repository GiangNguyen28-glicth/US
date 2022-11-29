import { MessageType } from '../../../constants/enum';
import { Conversation } from '../../conversation/entities/conversation.entity';
import { User } from '../../user/entities/user.entities';
import { IMessage } from '../interfaces/message';
export declare class Message implements IMessage {
    _id: string;
    text: string;
    sender: User;
    receiver: User;
    conversion_id: Conversation;
    type: MessageType;
    urlMessageImage: string;
    cursor: number;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    keyword: string;
}
export declare class MessageResult implements IResult<Message> {
    results: Message[];
    totalCount: number;
}
