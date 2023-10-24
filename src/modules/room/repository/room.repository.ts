import { JoinedRoom } from '@prisma/client';
import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

import { RoomEntity } from '../entities/room.entity';
import { JoinedRoomEntity } from 'src/modules/joinedRoom/entities/joindeRoom.entity';
import { JoinedRoomJoinProps } from 'src/modules/joinedRoom/interfaces/joinedRoom.interfaces';

@Injectable()
export class RoomRepository {
  constructor(private readonly prisma: PrismaService) {}

  async listAll(): Promise<RoomEntity[]> {
    return this.prisma.room.findMany({
      include: {
        joinedRoom: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  async checkRoomExist(roomId: string): Promise<boolean> {
    const room = await this.prisma.room.findUnique({
      where: {
        id: roomId,
      },
      select: {
        id: true,
      },
    });
    if (room) {
      return true;
    }

    return false;
  }

  async joinRoom(payload: JoinedRoomJoinProps): Promise<JoinedRoomEntity> {
    const { roomId, socketId, userId } = payload;
    return this.prisma.joinedRoom.create({
      data: {
        socketId,
        user: {
          connect: {
            id: userId,
          },
        },
        room: {
          connect: {
            id: roomId,
          },
        },
      },
    });
  }

  async leaveRoomByUserId(userId: string): Promise<void> {
    const joinRoom = await this.prisma.joinedRoom.findMany({
      where: {
        userId,
      },
    });

    if (joinRoom) {
      const delIds = joinRoom.map(item => item.id);
      await this.prisma.joinedRoom.deleteMany({
        where: {
          id: {
            in: delIds,
          },
        },
      });
    }
  }
  async leaveRoomBySocketId(socketId: string): Promise<void> {
    const joinRoom = await this.prisma.joinedRoom.findMany({
      where: {
        socketId,
      },
    });

    if (joinRoom) {
      const delIds = joinRoom.map(item => item.id);
      await this.prisma.joinedRoom.deleteMany({
        where: {
          id: {
            in: delIds,
          },
        },
      });
    }
  }

  async listAllWithUsers(): Promise<RoomEntity[]> {
    return this.prisma.room.findMany({
      include: {
        joinedRoom: {
          include: {
            user: true,
          },
        },
      },
    });
  }
}
