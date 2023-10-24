import { PrismaService } from 'src/prisma/prisma.service';
import { Module } from '@nestjs/common';

import { UserRepository } from './repository/user.repository';
import { MailModule } from '../mail/mail.module';
import { UserController } from './controller/user.controller';
import { UserService } from './services/user.service';

@Module({
  imports: [MailModule],
  controllers: [UserController],
  providers: [UserService, PrismaService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
