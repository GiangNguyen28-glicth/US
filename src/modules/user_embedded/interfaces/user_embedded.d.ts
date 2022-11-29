import { User } from '../../user/entities/user.entities';

export interface IUserEmbedded extends IEntity {
  user: string | User;
  countUnlike: number;
  unlikeUser: string[];
  countLike: number;
  like: string[];
}
