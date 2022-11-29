import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Socket {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
