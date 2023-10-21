import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

import { RoomEntity } from '../entities/room.entity';

@Injectable()
export class RoomRepository {
  constructor(private readonly prisma: PrismaService) {}

  async listAll(): Promise<RoomEntity[]> {
    return this.prisma.room.findMany();
  }
}
