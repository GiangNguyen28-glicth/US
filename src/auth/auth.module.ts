import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtService } from '@nestjs/jwt';
import { RtStrategy } from './strategies/jwt-rt.strategies';
import { AtStrategy } from './strategies/jwt-at.strategies';
import { UserModule } from '../modules/user/user.module';
import { MailService } from '../modules/mail/mail.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './strategies/google.strategies';
import { FaceBookStrategy } from './strategies/facebook.stategies';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthResolver,
    JwtService,
    RtStrategy,
    AtStrategy,
    MailService,
    GoogleStrategy,
    FaceBookStrategy,
  ],
})
export class AuthModule {}
