import { ConfirmMailInput } from './dto/mail.input';
import { MailService } from './mail.service';
export declare class MailResolver {
    private mailService;
    constructor(mailService: MailService);
    confirmMail(input: ConfirmMailInput): Promise<boolean>;
}
