import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSocketInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
