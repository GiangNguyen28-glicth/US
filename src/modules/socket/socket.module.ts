import { forwardRef, Global, Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { ChatGateway } from './chat.gateway';
import { UserModule } from '../user/user.module';
import { JwtService } from '@nestjs/jwt';
import { LoggerModule } from '../logger/logger.module';
import { WsStrategy } from '../../auth/strategies/ws.strategies';
import { MessageModule } from 'modules/message/message.module';
import { ConversationModule } from 'modules/conversation/conversation.module';

@Global()
@Module({
  imports: [
    forwardRef(() => UserModule),
    LoggerModule,
    MessageModule,
    ConversationModule,
  ],
  providers: [SocketService, ChatGateway, JwtService, WsStrategy],
  exports: [ChatGateway],
})
export class SocketModule {}
