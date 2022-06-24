import { Args, Resolver } from '@nestjs/graphql';
import { ConfirmMailInput } from './dto/mail.input';
import { MailService } from './mail.service';

@Resolver()
export class MailResolver {
  constructor(private mailService: MailService) {}
  async confirmMail(@Args('input') input: ConfirmMailInput): Promise<boolean> {
    return await this.mailService.confirmEmail(input);
  }
}
