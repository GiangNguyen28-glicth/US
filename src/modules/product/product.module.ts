import { CACHE_MANAGER, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Constants } from '../../constants/constants';
import { RandomCodeEnum } from '../../constants/enum';
import { toformatPrice } from '../../utils/feature.utils';
import { randomCode, toKeyword, toSlug } from '../../utils/string.utils';
import { CategoryModule } from '../category/category.module';
import { Product } from './entities/product.entities';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
import { ProductSchema } from './schemas/product.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Product.name,
        useFactory: () => {
          ProductSchema.index({ name: 1 });
          ProductSchema.pre('save', function (next) {
            if (!this.name) {
              this.name = 'BaseSource ' + randomCode(12, RandomCodeEnum.UPPER);
            }
            this.displayPrice = toformatPrice(this.price);
            this.slug = toSlug(this.name, Constants.LOCALE_COUNTRY_CODE_VN);
            this.keyword = toKeyword(this.slug);
            return next();
          });
          return ProductSchema;
        },
      },
    ]),
    CategoryModule,
  ],
  providers: [ProductResolver, ProductService],
  exports: [ProductService],
})
export class ProductModule {}
