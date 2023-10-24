import { Injectable, Logger } from '@nestjs/common';

import * as handlebars from 'handlebars';
import * as nodemailer from 'nodemailer';

import Mail from 'nodemailer/lib/mailer';

import { EmailDto } from '../dto/mail.dto';
import { readTemplate } from 'src/utils/read-template';

@Injectable()
export class MailGmailService {
  private mailer: Mail;

  constructor() {
    this.mailer = nodemailer.createTransport({
      host: process.env.SMTP_GMAIL_HOST,
      port: Number(process.env.SMTP_GMAIL_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_GMAIL_USER,
        pass: process.env.SMTP_GMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  public async send({
    destination,
    subject,
    template: templateName,
    replacements,
  }: EmailDto): Promise<void> {
    try {
      const file = readTemplate(templateName);
      const template = handlebars.compile(file);
      const html = template(replacements);

      const mail: Mail.Options = {
        subject,
        from: `
        ChatGold < ${process.env.SMTP_GMAIL_USER}`,
        to: [destination],
        html,
      };

      await this.mailer.sendMail(mail);

      Logger.log(`Email enviado com sucesso para: ${destination}`);
    } catch (error) {
      Logger.error(`Não foi enviar email para '${destination}'`, error);
    }
  }
}
