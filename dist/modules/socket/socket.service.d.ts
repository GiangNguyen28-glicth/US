import { MessageService } from 'modules/message/message.service';
import { User } from 'modules/user/entities/user.entities';
import { Cache } from 'cache-manager';
export declare class SocketService {
    private messageService;
    private cacheManager;
    constructor(messageService: MessageService, cacheManager: Cache);
    getSocketKeyOfUser(user: User): string[];
    getAllSocketIds(user: User): Promise<string[]>;
    findAll(): string;
    findOne(id: number): string;
    remove(id: number): string;
}
