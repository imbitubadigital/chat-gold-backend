import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

import { MessagePayloadProps } from 'src/modules/socket/interfaces/socket.interfaces';
import { MessageEntity } from '../entities/message.entity';

@Injectable()
export class MessageRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(payload: MessagePayloadProps): Promise<MessageEntity> {
    const { roomId, userId, content, type } = payload;

    const aaa = await this.prisma.message.create({
      data: {
        content,
        type,
        roomId,
        userId,
      },
      include: {
        user: true,
      },
    });

    return aaa;

    // return this.prisma.message.create({
    //   data: {
    //     content,
    //     type,
    //     roomId,
    //     userId,
    //   },
    //   include: {
    //     room: true,
    //     user: true,
    //   },
    // });
  }
}
