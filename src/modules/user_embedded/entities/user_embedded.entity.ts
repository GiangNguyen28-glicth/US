import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { GraphQLObjectID } from 'graphql-scalars';
import { User } from '../../user/entities/user.entities';
import { IUserEmbedded } from '../interfaces/user_embedded';

@ObjectType()
export class UserEmbedded implements IUserEmbedded {
  @Field(() => ID)
  _id?: string;

  @Field(() => User)
  user: User;

  @Field(() => Number)
  countUnlike: number;
  @Field(() => [GraphQLObjectID], { nullable: true })
  unlikeUser: string[];

  @Field(() => Number)
  countLike: number;

  @Field(() => [GraphQLObjectID], { nullable: true })
  like: string[];

  @Field(() => Date)
  createdAt?: Date;

  @Field(() => Date)
  updatedAt?: Date;
}
