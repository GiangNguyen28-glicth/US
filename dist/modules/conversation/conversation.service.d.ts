import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import { PaginationInput } from '../common/dto/common.dto';
import { LoggerService } from '../logger/logger.service';
import { User } from '../user/entities/user.entities';
import { CreateConversationInput, FilterGetOneConversation } from './dto/create-conversation.input';
import { Conversation, ConversationResult } from './entities/conversation.entity';
import { ConversationModelType } from './schema/conversion.schema';
export declare class ConversationService {
    private conversionModel;
    private loggerService;
    constructor(conversionModel: ConversationModelType, loggerService: LoggerService);
    create(input: CreateConversationInput): Promise<boolean>;
    findAll(input: PaginationInput, user: User): Promise<ConversationResult>;
    getAllUserMatched(input: PaginationInput, user: User, isMessaged: boolean): Promise<ConversationResult>;
    filterByLastMessaged(conversations: Conversation[], user_id: string): any;
    findOne(input: FilterGetOneConversation): Promise<Conversation>;
    findOneAndUpdate(filter: FilterQuery<Conversation>, update: UpdateQuery<Conversation>, options?: QueryOptions<Conversation> | null): Promise<Conversation>;
    updateModel(conversation: Conversation): Promise<Conversation>;
    getQueryOrMembers(members: string[]): {
        $or: {
            members: string[];
        }[];
    };
}
