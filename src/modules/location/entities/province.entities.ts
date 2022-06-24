import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Province {
  @Field({ nullable: true })
  name?: string;
  @Field(() => Int, { nullable: true })
  code?: number;
  @Field({ nullable: true })
  codename?: string;
  @Field(() => Int, { nullable: true })
  phone_code?: number;
}
