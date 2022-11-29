import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Message } from '../../message/entities/message.entity';
import { User } from '../../user/entities/user.entities';
import { IConversation } from '../interfaces/conversation';

@ObjectType()
export class Conversation implements IConversation {
  @Field(() => ID)
  _id: string;

  @Field(() => Message, { nullable: true })
  lastMessage: Message;

  @Field(() => Message, { nullable: true })
  messagePin: Message;

  @Field(() => [User])
  members: User[];

  @Field(() => User)
  user: User;

  @Field(() => Boolean)
  isDeleted: boolean;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

@ObjectType()
export class ConversationResult implements IResult<Conversation> {
  @Field(() => [Conversation], { nullable: true })
  results: Conversation[];

  @Field(() => Number, { nullable: true })
  totalCount: number;
}
