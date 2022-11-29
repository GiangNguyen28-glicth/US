import { MessageType } from '../../../constants/enum';
import { IMessage, IMessageCreate } from '../interfaces/message';
export declare class CreateMessageInput implements IMessageCreate {
    text: string;
    sender: string;
    receiver: string;
    conversion_id: string;
    type: MessageType;
}
export declare class FilterGetAllMessage implements Partial<IMessage> {
    conversion_id?: string;
    type?: MessageType;
}
export declare class PaginationMessageInput {
    cursor: number;
    limit: number;
}
