import { JwtService } from '@nestjs/jwt';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Cache } from 'cache-manager';
import { ConversationService } from 'modules/conversation/conversation.service';
import { CreateMessageInput } from 'modules/message/dto/create-message.input';
import { Message } from 'modules/message/entities/message.entity';
import { MessageService } from 'modules/message/message.service';
import { User } from 'modules/user/entities/user.entities';
import { Server, Socket } from 'socket.io';
import { LoggerService } from '../logger/logger.service';
import { UserService } from '../user/user.service';
import { SocketService } from './socket.service';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
    private userService;
    private cacheManager;
    private jwtService;
    private loggerService;
    private messageService;
    private socketService;
    private conversationService;
    constructor(userService: UserService, cacheManager: Cache, jwtService: JwtService, loggerService: LoggerService, messageService: MessageService, socketService: SocketService, conversationService: ConversationService);
    server: Server;
    handleDisconnect(socket: Socket): Promise<void>;
    handleBroadcastDisconnection(userId: string): Promise<void>;
    handleConnection(socket: Socket, ...args: any[]): Promise<void>;
    verifyFirstConnection(socket: Socket, user: User): Promise<void>;
    afterInit(server: Server): void;
    sendMessage(data: CreateMessageInput, user: User): Promise<Message>;
    userOnline(user: User): Promise<any>;
    handleHeartBeat(socket: Socket, data: any, user: User): void;
    getAllUserMatchedTabMessage(user: User): Promise<void>;
    getAllUserMatchedTabMatched(user: User): Promise<void>;
    sendEmit(socketIds: any, event: string, data: any): void;
}
