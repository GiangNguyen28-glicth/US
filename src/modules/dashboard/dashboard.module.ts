import { Module } from '@nestjs/common';
import { RolesGuard } from '../../common/guards/role.guard';
import { OrderModule } from '../order/order.module';
import { UserModule } from '../user/user.module';
import { DashboardResolver } from './dashboard.resolver';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [OrderModule, UserModule, RolesGuard],
  providers: [DashboardService, DashboardResolver],
})
export class DashboardModule {}
