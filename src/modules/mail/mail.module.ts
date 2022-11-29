import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { MailResolver } from './mail.resolver';
import { MailService } from './mail.service';

@Module({
  imports: [UserModule],
  providers: [MailResolver, MailService, JwtService],
})
export class MailModule {}
