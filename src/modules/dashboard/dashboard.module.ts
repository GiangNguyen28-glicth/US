import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardResolver } from './dashboard.resolver';
import { OrderModule } from '../order/order.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [OrderModule, UserModule],
  providers: [DashboardService, DashboardResolver],
})
export class DashboardModule {}
