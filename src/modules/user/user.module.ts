import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { User } from './entities/user.entities';
import { randomCode, toKeyword, toSlug } from '../../utils/string.utils';
import { RandomCodeEnum } from '../../constants/enum';
import { Constants } from '../../constants/constants';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          UserSchema.pre('save', function (next) {
            if (!this.username) {
              this.username =
                'BaseSource ' + randomCode(12, RandomCodeEnum.UPPER);
            }
            this.slug = toSlug(this.username, Constants.LOCALE_COUNTRY_CODE_VN);
            this.keyword = toKeyword(this.slug);
            return next();
          });
          return UserSchema;
        },
      },
    ]),
  ],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
