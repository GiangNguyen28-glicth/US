import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagResolver } from './tag.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Tag } from './entities/tag.entity';
import { TagSchema } from './schema/tag.schema';
import { toKeyword, toSlug } from '../../utils/string.utils';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Tag.name,
        useFactory: () => {
          TagSchema.pre('save', function (next) {
            // this.name = toKeyword(toSlug(this.slug));
            return next();
          });
          return TagSchema;
        },
      },
    ]),
  ],
  providers: [TagResolver, TagService],
})
export class TagModule {}
