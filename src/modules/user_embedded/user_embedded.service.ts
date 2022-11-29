import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  FilterQuery,
  QueryOptions,
  ReturnsNewDoc,
  UpdateQuery,
} from 'mongoose';
import { Constants } from '../../constants/constants';
import { UserEmbedded } from './entities/user_embedded.entity';
import { UserEmbeddedModelType } from './schema/user_embedded.schema';
@Injectable()
export class UserEmbeddedService {
  constructor(
    @InjectModel(UserEmbedded.name)
    private userEmbeddedModel: UserEmbeddedModelType,
  ) {}

  async getCurrentEmbedded(user_id: string): Promise<UserEmbedded> {
    const user_embedded = await this.userEmbeddedModel.findOne({
      user: user_id,
      count: { $lt: Constants.MAX_COUNT_IN_USER_EMBEDDED },
    });
    return user_embedded;
  }

  async findOneAndUpdate(
    filter: FilterQuery<UserEmbedded>,
    update: UpdateQuery<UserEmbedded>,
    options: QueryOptions<UserEmbedded> & ReturnsNewDoc,
  ): Promise<boolean> {
    try {
      return this.userEmbeddedModel.findOneAndUpdate(filter, update, options);
    } catch (error) {
      throw error;
    }
  }

  async getAllIdsNotLike(user_id: string): Promise<string[]> {
    try {
      const user_ids: string[] = await this.userEmbeddedModel
        .find({ user: user_id })
        .distinct('unlikeUser');
      return user_ids;
    } catch (error) {
      throw error;
    }
  }

  async getAllIdsLiked(user_id: string): Promise<string[]> {
    try {
      const user_ids: string[] = await this.userEmbeddedModel
        .find({ user: user_id, countLike: { $gt: 0 } })
        .distinct('like');
      return user_ids;
    } catch (error) {
      throw error;
    }
  }
}
