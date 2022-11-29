import { Field, HideField, InputType } from '@nestjs/graphql';
import { GraphQLObjectID } from 'graphql-scalars';
import { MessageType } from '../../../constants/enum';
import { IMessage, IMessageCreate } from '../interfaces/message';

@InputType()
export class CreateMessageInput implements IMessageCreate {
  @Field()
  text: string;

  @HideField()
  sender: string;

  @Field(() => GraphQLObjectID)
  receiver: string;

  @Field(() => GraphQLObjectID)
  conversion_id: string;

  @Field(() => MessageType)
  type: MessageType;
}

@InputType()
export class FilterGetAllMessage implements Partial<IMessage> {
  @Field(() => GraphQLObjectID, { nullable: true })
  conversion_id?: string;

  @Field(() => MessageType, { nullable: true })
  type?: MessageType;
}

@InputType()
export class PaginationMessageInput {
  @Field(() => Number, { nullable: true })
  cursor: number;

  @Field(() => Number, { nullable: true })
  limit: number;
}
