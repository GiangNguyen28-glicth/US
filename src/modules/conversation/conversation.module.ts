import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationResolver } from './conversation.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Conversation } from './entities/conversation.entity';
import { ConversationSchema } from './schema/conversion.schema';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Conversation.name,
        useFactory: () => {
          ConversationSchema.pre('save', function (next) {
            return next();
          });
          return ConversationSchema;
        },
      },
    ]),
    LoggerModule,
  ],
  providers: [ConversationResolver, ConversationService],
  exports: [ConversationService],
})
export class ConversationModule {}
