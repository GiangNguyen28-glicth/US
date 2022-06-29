import { Args, Mutation, Resolver } from '@nestjs/graphql';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import Upload from 'graphql-upload/Upload.js';
import { CloudinaryService } from './cloudinary.service';

@Resolver('Cloudinary')
export class CloudinaryResolver {
  constructor(private cloudinaryService: CloudinaryService) {}
  @Mutation(() => String)
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload }) file: Upload,
  ): Promise<any> {
    const { createReadStream } = await file;
    const stream = createReadStream();
    await this.cloudinaryService.uploadImage({ stream });
    return 'Hello';
  }
}
