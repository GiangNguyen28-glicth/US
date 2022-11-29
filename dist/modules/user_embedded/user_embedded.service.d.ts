import { FilterQuery, QueryOptions, ReturnsNewDoc, UpdateQuery } from 'mongoose';
import { UserEmbedded } from './entities/user_embedded.entity';
import { UserEmbeddedModelType } from './schema/user_embedded.schema';
export declare class UserEmbeddedService {
    private userEmbeddedModel;
    constructor(userEmbeddedModel: UserEmbeddedModelType);
    getCurrentEmbedded(user_id: string): Promise<UserEmbedded>;
    findOneAndUpdate(filter: FilterQuery<UserEmbedded>, update: UpdateQuery<UserEmbedded>, options: QueryOptions<UserEmbedded> & ReturnsNewDoc): Promise<boolean>;
    getAllIdsNotLike(user_id: string): Promise<string[]>;
    getAllIdsLiked(user_id: string): Promise<string[]>;
}
