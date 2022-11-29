import { User } from '../../user/entities/user.entities';
import { IUserEmbedded } from '../interfaces/user_embedded';
export declare class UserEmbedded implements IUserEmbedded {
    _id?: string;
    user: User;
    countUnlike: number;
    unlikeUser: string[];
    countLike: number;
    like: string[];
    createdAt?: Date;
    updatedAt?: Date;
}
