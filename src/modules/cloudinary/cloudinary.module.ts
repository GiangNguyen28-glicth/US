import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryResolver } from './cloudinary.resolver';
import { CloudinaryProvider } from './cloudinary.provider';

@Module({
  providers: [CloudinaryService, CloudinaryResolver, CloudinaryProvider],
})
export class CloudinaryModule {}
