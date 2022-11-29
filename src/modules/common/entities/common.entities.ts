import { Field, ObjectType } from '@nestjs/graphql';
import { IImage } from '../interfaces/common';
@ObjectType()
export class Image implements IImage {
  @Field({ nullable: true })
  default: string;
  @Field({ nullable: true })
  medium: string;
  @Field({ nullable: true })
  small: string;
  @Field({ nullable: true })
  base64: string;
  @Field({ nullable: true })
  description: string;
  @Field({ nullable: true })
  alt: string;
}
