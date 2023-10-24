import { Module } from '@nestjs/common';

import { UserModule } from '../user/user.module';

import { RoomModule } from '../room/room.module';
import { MessageRepository } from '../message/repository/message.repository';
import { MessageService } from '../message/services/message.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [UserModule, RoomModule],
  controllers: [],
  providers: [MessageService, MessageRepository, PrismaService],
  exports: [MessageService],
})
export class MessageModule {}
