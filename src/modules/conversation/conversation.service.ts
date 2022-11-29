import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import { Constants } from '../../constants/constants';
import { FilterBuilder } from '../../utils/filter.query';
import { throwIfNotExists } from '../../utils/model.utils';
import { PaginationInput } from '../common/dto/common.dto';
import { LoggerService } from '../logger/logger.service';
import { User } from '../user/entities/user.entities';
import {
  CreateConversationInput,
  FilterGetOneConversation,
} from './dto/create-conversation.input';
import {
  Conversation,
  ConversationResult,
} from './entities/conversation.entity';
import { ConversationModelType } from './schema/conversion.schema';

@Injectable()
export class ConversationService {
  constructor(
    @InjectModel(Conversation.name)
    private conversionModel: ConversationModelType,
    private loggerService: LoggerService,
  ) {}
  async create(input: CreateConversationInput): Promise<boolean> {
    try {
      const conversation = await this.conversionModel.create(input);
      return conversation ? true : false;
    } catch (error) {
      throw error;
    }
  }

  async findAll(
    input: PaginationInput,
    user: User,
  ): Promise<ConversationResult> {
    const [queryFilter, querySort] = new FilterBuilder<Conversation>()
      .setFilterItem(
        'members',
        {
          $elemMatch: { $eq: user._id },
        },
        user._id,
      )
      .setSortItem('updatedAt', -1)
      .buildQuery();
    const [results, totalCount] = await Promise.all([
      this.conversionModel
        .find(queryFilter)
        .skip(input?.size)
        .limit((input?.page - 1) * input?.size)
        .sort(querySort),
      this.conversionModel.count(queryFilter),
    ]);
    this.loggerService.debug(`Conversation result :${results.length}`);
    return { results, totalCount };
  }

  async getAllUserMatched(
    input: PaginationInput,
    user: User,
    isMessaged: boolean,
  ): Promise<ConversationResult> {
    let subQuery = null;
    if (isMessaged === true) {
      subQuery = { $ne: null };
    } else if (isMessaged === false) {
      subQuery = { $eq: null };
    }
    const [queryFilter, querySort] = new FilterBuilder<Conversation>()
      .setFilterItem(
        'members',
        {
          $elemMatch: { $eq: user._id },
        },
        user._id,
      )
      .setFilterItem('lastMessage', subQuery, subQuery)
      .setSortItem('updatedAt', -1)
      .buildQuery();
    // eslint-disable-next-line prefer-const
    let [results, totalCount] = await Promise.all([
      this.conversionModel
        .find(queryFilter)
        .skip(input?.size)
        .limit((input?.page - 1) * input?.size)
        .sort(querySort)
        .populate('members', Constants.EXCLUDE_FIELDS),
      this.conversionModel.count(queryFilter),
    ]);
    results = this.filterByLastMessaged(results, user._id.toString());
    this.loggerService.debug(`Conversation result :${results.length}`);
    return { results, totalCount };
  }

  filterByLastMessaged(conversations: Conversation[], user_id: string): any {
    return conversations.filter(item => {
      item.user =
        item.members[0]._id.toString() === user_id
          ? item.members[1]
          : item.members[0];
      return item;
    });
  }

  async findOne(input: FilterGetOneConversation): Promise<Conversation> {
    try {
      let queryFilter = {};
      if (input?.members) {
        const reverseMembers = input?.members.reverse();
        queryFilter = {
          $or: [{ members: input.members }, { members: reverseMembers }],
        };
      }
      if (input?._id) {
        queryFilter['_id'] = input?._id;
      }
      const conversation = await this.conversionModel.findOne(queryFilter);
      throwIfNotExists(conversation, 'Conversation not found');
      return conversation;
    } catch (error) {
      throw error;
    }
  }

  async findOneAndUpdate(
    filter: FilterQuery<Conversation>,
    update: UpdateQuery<Conversation>,
    options?: QueryOptions<Conversation> | null,
  ): Promise<Conversation> {
    try {
      const conversation = await this.conversionModel.findOneAndUpdate(
        filter,
        update,
        options,
      );
      return conversation;
    } catch (error) {
      throw error;
    }
  }

  async updateModel(conversation: Conversation): Promise<Conversation> {
    const conversationUpdate = new this.conversionModel(conversation);
    return await conversationUpdate.save();
  }

  getQueryOrMembers(members: string[]) {
    const reverseMembers = members.reverse();
    const query = {
      $or: [{ members: members }, { members: reverseMembers }],
    };
    return query;
  }
}
