import { PaginationInput } from '../common/dto/common.dto';
import { User } from '../user/entities/user.entities';
import { ConversationService } from './conversation.service';
import { CreateConversationInput, FilterGetOneConversation } from './dto/create-conversation.input';
import { Conversation, ConversationResult } from './entities/conversation.entity';
export declare class ConversationResolver {
    private readonly conversationService;
    constructor(conversationService: ConversationService);
    createConversation(input: CreateConversationInput): Promise<boolean>;
    getAllConversation(pagination: PaginationInput, user: User): Promise<ConversationResult>;
    getAllUserMatched(user: User, pagination: PaginationInput, isMessaged: boolean): Promise<ConversationResult>;
    getOneConversation(input: FilterGetOneConversation): Promise<Conversation>;
}
