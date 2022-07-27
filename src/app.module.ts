import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CacheModule, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import { RedisClientOptions } from 'redis';
import { AuthModule } from './auth/auth.module';
import { GqlThrottlerGuard } from './common/guards/throttler.guard';
import { CacheConfigService } from './configs/cache.config';
import { GraphqlService } from './configs/graphql.config';
import { MoongoseConfigService } from './configs/moongose.config';
import { ThrottlerConfigService } from './configs/throttler.config';
import { CartModule } from './modules/cart/cart.module';
import { CategoryModule } from './modules/category/category.module';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { LocationModule } from './modules/location/location.module';
import { MailModule } from './modules/mail/mail.module';
import { OrderItemModule } from './modules/order-item/order-item.module';
import { OrderModule } from './modules/order/order.module';
import { ProductModule } from './modules/product/product.module';
import { ReviewModule } from './modules/review/review.module';
import { UserModule } from './modules/user/user.module';
import { HealthCheckerModule } from './modules/health-checker/health-checker.module';
import { AppController } from './app.controller';
@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GraphqlService,
    }),
    MongooseModule.forRootAsync({
      useClass: MoongoseConfigService,
    }),
    ThrottlerModule.forRootAsync({
      useClass: ThrottlerConfigService,
    }),
    // CacheModule.registerAsync<RedisClientOptions>({
    //   isGlobal: true,
    //   useClass: CacheConfigService,
    // }),
    AuthModule,
    UserModule,
    CartModule,
    LocationModule,
    CategoryModule,
    MailModule,
    OrderModule,
    ProductModule,
    CloudinaryModule,
    ReviewModule,
    OrderModule,
    OrderItemModule,
    DashboardModule,
    HealthCheckerModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GqlThrottlerGuard,
    },
  ],
  controllers: [AppController],
})
export class AppModule {}
