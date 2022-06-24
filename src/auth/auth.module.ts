import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RolesGuard } from '../common/guards/role.guard';
import { MailModule } from '../modules/mail/mail.module';
import { UserModule } from '../modules/user/user.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { AtStrategy } from './strategies/jwt-at.strategies';
import { RtStrategy } from './strategies/jwt-rt.strategies';

@Module({
  imports: [UserModule, MailModule],
  providers: [
    AuthResolver,
    AuthService,
    AtStrategy,
    RtStrategy,
    RolesGuard,
    JwtService,
  ],
})
export class AuthModule {}
