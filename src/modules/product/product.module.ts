import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Constants } from '../../constants/constants';
import { RandomCodeEnum } from '../../constants/enum';
import { toformatPrice } from '../../utils/feature.utils';
import { randomCode, toKeyword, toSlug } from '../../utils/string.utils';
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
  ],
  providers: [ProductResolver, ProductService],
})
export class ProductModule {}
