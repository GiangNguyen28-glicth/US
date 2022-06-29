import { Module } from '@nestjs/common';
import { cacheConfig } from './configs/cache.config';
import { graphqlConfig } from './configs/graphql.config';
import { moongoseConfig } from './configs/moongose.config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { CartModule } from './modules/cart/cart.module';
import { LocationModule } from './modules/location/location.module';
import { CategoryModule } from './modules/category/category.module';
import { MailModule } from './modules/mail/mail.module';
import { OrderModule } from './modules/order/order.module';
import { ProductModule } from './modules/product/product.module';
import { throttlerConfig } from './configs/throttler.config';
import { APP_GUARD } from '@nestjs/core';
import { GqlThrottlerGuard } from './common/guards/throttler.guard';

@Module({
  imports: [
    graphqlConfig,
    moongoseConfig,
    throttlerConfig,
    AuthModule,
    UserModule,
    CartModule,
    LocationModule,
    CategoryModule,
    MailModule,
    OrderModule,
    ProductModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GqlThrottlerGuard,
    },
  ],
})
export class AppModule {}
