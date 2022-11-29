import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageResolver } from './message.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Message } from './entities/message.entity';
import { MessageSchema } from './schema/message.schema';
import { toKeyword, toSlug } from '../../utils/string.utils';
import { ConversationModule } from '../conversation/conversation.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Message.name,
        useFactory: () => {
          MessageSchema.index({ cursor: 1 });
          MessageSchema.pre('save', function (next) {
            this.keyword = toKeyword(toSlug(this.text));
            return next();
          });
          return MessageSchema;
        },
      },
    ]),
    ConversationModule,
  ],
  providers: [MessageResolver, MessageService],
  exports: [MessageService],
})
export class MessageModule {}
