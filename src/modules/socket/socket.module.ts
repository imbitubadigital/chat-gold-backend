import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { UserModule } from '../user/user.module';

import { RoomModule } from '../room/room.module';
import { MessageRepository } from '../message/repository/message.repository';
import { MessageService } from '../message/services/message.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { MessageModule } from '../message/message.module';

@Module({
  imports: [UserModule, RoomModule, MessageModule],
  controllers: [],
  providers: [SocketGateway, MessageService, MessageRepository, PrismaService],
})
export class SocketModule {}
