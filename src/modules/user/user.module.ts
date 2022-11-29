import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SocketModule } from 'modules/socket/socket.module';
import { Constants } from '../../constants/constants';
import { toKeyword, toSlug } from '../../utils/string.utils';
import { CloudinaryProvider } from '../common/cloudinary/cloudinary.provider';
import { CloudinaryService } from '../common/cloudinary/cloudinary.service';
import { ConversationModule } from '../conversation/conversation.module';
import { LoggerModule } from '../logger/logger.module';
import { UserEmbeddedModule } from '../user_embedded/user_embedded.module';
import { User } from './entities/user.entities';
import { UserHelper } from './helper/user.helper';
import { UserSchema } from './schema/user.schema';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          UserSchema.index({ showMeTinder: 1 });
          UserSchema.index({ geoLocation: '2dsphere' });
          UserSchema.pre('save', function (next) {
            this.slug = toSlug(this.username, Constants.LOCALE_COUNTRY_CODE_VN);
            this.keyword = toKeyword(this.slug);
            this.slug += '-' + this._id.toString();
            if (this.birthDays) {
              const currentDate = new Date();
              this.age =
                currentDate.getFullYear() - this.birthDays.getFullYear();
            }
            return next();
          });
          return UserSchema;
        },
      },
    ]),
    UserEmbeddedModule,
    LoggerModule,
    ConversationModule,
    forwardRef(() => SocketModule),
  ],
  providers: [
    UserResolver,
    UserService,
    UserHelper,
    CloudinaryService,
    CloudinaryProvider,
  ],
  exports: [UserService],
})
export class UserModule {}
