import { CacheModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheConfigService } from './configs/cache.config';
import { GraphqlService } from './configs/graphql.config';
import { ThrottlerConfigService } from './configs/throttler.config';
import type { RedisClientOptions } from 'redis';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { APP_GUARD } from '@nestjs/core';
import { GqlThrottlerGuard } from './common/guard/throttler.guard';
import { UserModule } from './modules/user/user.module';
import { MailModule } from './modules/mail/mail.module';
import { MongooseConfigService } from './configs/mongoose.config';
import { ConversationModule } from './modules/conversation/conversation.module';
import { TagModule } from './modules/tag/tag.module';
import { MessageModule } from './modules/message/message.module';
import { LoggerModule } from './modules/logger/logger.module';
import { SocketModule } from './modules/socket/socket.module';
import { UserEmbeddedModule } from './modules/user_embedded/user_embedded.module';
@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GraphqlService,
    }),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    ThrottlerModule.forRootAsync({
      useClass: ThrottlerConfigService,
    }),
    CacheModule.registerAsync<RedisClientOptions>({
      isGlobal: true,
      useClass: CacheConfigService,
    }),
    AuthModule,
    UserModule,
    MailModule,
    ConversationModule,
    TagModule,
    MessageModule,
    LoggerModule,
    SocketModule,
    UserEmbeddedModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GqlThrottlerGuard,
    },
  ],
})
export class AppModule {}
