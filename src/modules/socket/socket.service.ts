import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Constants } from 'constants/constants';
import { MessageService } from 'modules/message/message.service';
import { User } from 'modules/user/entities/user.entities';
import { getValueWithSocketKey } from 'utils/redis.utils';
import { Cache } from 'cache-manager';

@Injectable()
export class SocketService {
  constructor(
    private messageService: MessageService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  getSocketKeyOfUser(user: User): string[] {
    const socketKey: string[] = [];
    for (const item of user.matched) {
      const key = Constants.SOCKET + item._id;
      socketKey.push(key);
    }
    return socketKey;
  }

  async getAllSocketIds(user: User): Promise<string[]> {
    const socketKey = this.getSocketKeyOfUser(user);
    const socketIds = await getValueWithSocketKey(this.cacheManager, socketKey);
    return socketIds;
  }

  findAll() {
    return `This action returns all socket`;
  }

  findOne(id: number) {
    return `This action returns a #${id} socket`;
  }

  remove(id: number) {
    return `This action removes a #${id} socket`;
  }
}
