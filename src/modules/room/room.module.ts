import { Module } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { RoomController } from './controller/room.controller';
import { RoomService } from './services/room.service';
import { RoomRepository } from './repository/room.repository';

@Module({
  imports: [],
  controllers: [RoomController],
  providers: [RoomService, PrismaService, RoomRepository],
  exports: [RoomService],
})
export class RoomModule {}
