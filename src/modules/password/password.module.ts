import { PasswordRepository } from './repository/password.repository';
import { PrismaService } from './../../prisma/prisma.service';
import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { MailModule } from '../mail/mail.module';
import { PasswordController } from './controller/password.controller';
import { PasswordService } from './services/password.service';

@Module({
  imports: [AuthModule, MailModule],
  controllers: [PasswordController],
  providers: [PasswordService, PrismaService, PasswordRepository],
})
export class PasswordModule {}
