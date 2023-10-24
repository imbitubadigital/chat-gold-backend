import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseCreateUserDto } from '../dto/response-create-user';
import { CreateDataUserDto } from '../dto/create-data-user.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createDataUserDto: CreateDataUserDto,
  ): Promise<ResponseCreateUserDto> {
    const { code, expiration, ...rest } = createDataUserDto;

    const data: Prisma.UserCreateInput = {
      ...rest,

      codes: {
        create: [
          {
            code: code,
            expiration: String(expiration),
          },
        ],
      },
      roles: {
        connect: {
          value: 'USER',
        },
      },
    };

    return this.prisma.user.create({
      data,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
      },
    });
  }

  async getClientByEmail(email: string): Promise<UserEntity> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async checkUserExist(roomId: string): Promise<boolean> {
    const room = await this.prisma.user.findUnique({
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
}
