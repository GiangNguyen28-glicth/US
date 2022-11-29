import {
  CACHE_MANAGER,
  forwardRef,
  Inject,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Cache } from 'cache-manager';
import { GetUserWS } from 'common/decorators/getuser.decorators';
import { StatusActive } from 'constants/enum';
import { ConversationService } from 'modules/conversation/conversation.service';
import { CreateMessageInput } from 'modules/message/dto/create-message.input';
import { Message } from 'modules/message/entities/message.entity';
import { MessageService } from 'modules/message/message.service';
import { User } from 'modules/user/entities/user.entities';
import { Server, Socket } from 'socket.io';
import { IJwtPayload } from '../../auth/entities/auth.entities';
import { WsGuard } from '../../common/guard/ws.guard';
import { Constants } from '../../constants/constants';
import { LoggerService } from '../logger/logger.service';
import { UserService } from '../user/user.service';
import { SocketService } from './socket.service';

@WebSocketGateway({ transport: ['websocket'], allowEIO3: true, cors: '*' })
export class ChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private jwtService: JwtService,
    private loggerService: LoggerService,
    private messageService: MessageService,
    private socketService: SocketService,
    private conversationService: ConversationService,
  ) {
    this.loggerService.setContext('ChatGateway');
  }
  @WebSocketServer()
  public server: Server;
  async handleDisconnect(@ConnectedSocket() socket: Socket) {
    try {
      const userId = (socket as any).userId;
      const socketKey = Constants.SOCKET + userId;
      let socketIds: string[] = await this.cacheManager.get(socketKey);
      this.loggerService.log(`Socket IDS in array: ${socketIds}`);
      if (!socketIds) {
        return;
      }
      socketIds = socketIds.filter(socketId => {
        if (socketId != socket.id) {
          return socketId;
        }
      });
      if (socketIds.length === 0) {
        await Promise.all([
          this.cacheManager.del(Constants.SOCKET + userId),
          this.handleBroadcastDisconnection(userId),
        ]);
      } else {
        this.loggerService.log(`Socket IDS in array After: ${socketIds}`);
        await this.cacheManager.set(socketKey, socketIds, {
          ttl: Constants.SOCKET_ID_TTL,
        });
      }
    } catch (error) {
      throw error;
    }
  }

  async handleBroadcastDisconnection(userId: string): Promise<void> {
    const user = await this.userService.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          lastActive: new Date(),
          statusActive: StatusActive.OFFLINE,
        },
      },
    );
    const socketIds = await this.socketService.getAllSocketIds(user);
    socketIds.forEach(item => {
      this.server.sockets.to(item).emit('userMatchedDisconnection', user);
    });
  }

  async handleConnection(@ConnectedSocket() socket: Socket, ...args: any[]) {
    try {
      let socketIds: string[] = [];
      if (socket.handshake.query && socket.handshake.query.token) {
        const token: string = socket.handshake.query.token as string;
        const payload: IJwtPayload = await this.jwtService.verify(token, {
          secret: process.env.JWT_ACCESS_TOKEN_SECRET,
        });
        const user = await this.userService.findOne({ _id: payload._id });
        (socket as any).userId = user._id.toString();
        const socketKey = Constants.SOCKET + user._id.toString();
        socketIds = await this.cacheManager.get(socketKey);
        this.loggerService.debug(`Socket IDS in array: ${socketIds}`);
        if (socketIds) {
          socketIds.push(socket.id);
          this.loggerService.debug(
            `Socket IDS after push to array:${socketIds}`,
          );
        } else {
          this.loggerService.debug('Push socket id to array');
          socketIds = [socket.id];
        }
        await this.cacheManager.set(socketKey, socketIds, {
          ttl: Constants.SOCKET_ID_TTL,
        });
        this.loggerService.log(
          '==========================================================',
        );
      } else {
        throw new UnauthorizedException('Who are you?');
      }
    } catch (error) {
      throw error;
    }
  }

  afterInit(server: Server) {
    this.server = server;
  }

  @SubscribeMessage('sendMessage')
  @UseGuards(WsGuard)
  async sendMessage(
    @MessageBody() data: CreateMessageInput,
    @GetUserWS() user: User,
  ): Promise<Message> {
    try {
      data.sender = user._id.toString();
      const [message, socketIds] = await Promise.all([
        this.messageService.create(data),
        this.cacheManager.get(Constants.SOCKET + user._id.toString()),
      ]);
      this.sendEmit(socketIds, 'receiverMessage', message);
      return message;
    } catch (error) {
      throw error;
    }
  }

  @SubscribeMessage('isOnline')
  @UseGuards(WsGuard)
  async userOnline(@GetUserWS() user: User): Promise<any> {
    try {
      const socketIds = await this.socketService.getAllSocketIds(user);
      socketIds.forEach(item => {
        this.server.sockets.to(item).emit('userMatchedConnection', user);
      });
    } catch (error) {
      throw error;
    }
  }

  @SubscribeMessage('heartbeat')
  @UseGuards(WsGuard)
  handleHeartBeat(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: any,
    @GetUserWS() user: User,
  ) {
    console.log('This is user', user);
    this.loggerService.debug(socket.id);
  }

  @SubscribeMessage('getAllUserMatched_tabMessage')
  @UseGuards(WsGuard)
  async getAllUserMatchedTabMessage(@GetUserWS() user: User) {
    try {
      const [socketIds, users] = await Promise.all([
        this.cacheManager.get(Constants.SOCKET + user._id.toString()),
        this.conversationService.getAllUserMatched(null, user, true),
      ]);
      this.sendEmit(socketIds, 'listUserMatched_tabMessage', users);
    } catch (error) {
      throw error;
    }
  }

  @SubscribeMessage('getAllUserMatched_tabMatched')
  @UseGuards(WsGuard)
  async getAllUserMatchedTabMatched(@GetUserWS() user: User) {
    try {
      const [socketIds, users] = await Promise.all([
        this.cacheManager.get(Constants.SOCKET + user._id.toString()),
        this.conversationService.getAllUserMatched(null, user, false),
      ]);
      this.sendEmit(socketIds, 'listUserMatched_tabMatched', users);
    } catch (error) {
      throw error;
    }
  }

  sendEmit(socketIds, event: string, data) {
    if (socketIds) {
      (socketIds as string[]).forEach(item => {
        this.server.sockets.to(item).emit(event, data);
      });
    }
  }
}
