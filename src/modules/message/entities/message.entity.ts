import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { MessageType } from '../../../constants/enum';
import { Conversation } from '../../conversation/entities/conversation.entity';
import { User } from '../../user/entities/user.entities';
import { IMessage } from '../interfaces/message';

@ObjectType()
export class Message implements IMessage {
  @Field(() => ID)
  _id: string;

  @Field({ nullable: true })
  text: string;

  @Field(() => User)
  sender: User;

  @Field(() => User)
  receiver: User;

  @Field(() => Conversation)
  conversion_id: Conversation;

  @Field(() => MessageType)
  type: MessageType;

  @Field({ nullable: true })
  urlMessageImage: string;

  @Field(() => Number)
  cursor: number;

  @Field(() => Boolean)
  isDeleted: boolean;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field()
  keyword: string;
}

@ObjectType()
export class MessageResult implements IResult<Message> {
  @Field(() => [Message], { nullable: true })
  results: Message[];

  @Field(() => Number, { nullable: true })
  totalCount: number;
}
