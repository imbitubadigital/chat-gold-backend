import { Module } from '@nestjs/common';

import { MailGmailService } from './service/mailGmail.service';

@Module({
  providers: [MailGmailService],
  exports: [MailGmailService],
})
export class MailModule {}
