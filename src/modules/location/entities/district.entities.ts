import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class District {
  @Field({ nullable: true })
  name?: string;
  @Field(() => Int, { nullable: true })
  code?: number;
  @Field({ nullable: true })
  division_type?: string;
  @Field({ nullable: true })
  codename?: string;
  @Field(() => Int, { nullable: true })
  province_code: number;
}
