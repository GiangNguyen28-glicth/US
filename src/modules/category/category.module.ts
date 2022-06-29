import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Constants } from '../../constants/constants';
import { RandomCodeEnum } from '../../constants/enum';
import { randomCode, toKeyword, toSlug } from '../../utils/string.utils';
import { CategoryResolver } from './category.resolver';
import { CategoryService } from './category.service';
import { Category } from './entites/category.entities';
import { CategorySchema } from './schemas/category.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Category.name,
        useFactory: () => {
          CategorySchema.pre('save', function (next) {
            if (!this.name) {
              this.name = 'BaseSource ' + randomCode(12, RandomCodeEnum.UPPER);
            }
            this.slug = toSlug(this.name, Constants.LOCALE_COUNTRY_CODE_VN);
            this.keyword = toKeyword(this.slug);
            return next();
          });
          return CategorySchema;
        },
      },
    ]),
  ],
  providers: [CategoryResolver, CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
