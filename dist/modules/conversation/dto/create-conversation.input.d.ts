import { IConversation } from '../interfaces/conversation';
export declare class CreateConversationInput implements IConversation {
    lastMessage?: string;
    messagePin?: string;
    members: string[];
}
export declare class FilterGetOneConversation implements Partial<IConversation> {
    _id: string;
    members?: string[];
}
