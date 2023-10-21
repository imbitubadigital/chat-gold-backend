import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/modules/user/entities/user.entity';

import { PrismaService } from 'src/prisma/prisma.service';

import { CreateRefreshTokenDto } from '../dto/create-refresh-token.dto';
import { ResponseCheckRefreshDto } from '../dto/response-check-refresh.dto';

import { RefreshEntity } from '../entities/refresh.entity';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUserById(id: string): Promise<UserEntity> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    return this.prisma.user.findUnique({
      where: { email },
      include: {
        roles: true,
      },
    });
  }

  async saveRefreshToken(
    createRefreshTokenDto: CreateRefreshTokenDto,
  ): Promise<RefreshEntity> {
    return this.prisma.refresh.create({
      data: {
        expiration: String(createRefreshTokenDto.expiration),
        user: {
          connect: {
            id: createRefreshTokenDto.user_id,
          },
        },
      },
    });
  }

  async getRefreshToken(
    user_id: string,
    expiration: number,
  ): Promise<ResponseCheckRefreshDto> {
    return this.prisma.user.findUnique({
      where: {
        id: user_id,
      },
      select: {
        id: true,
        active: true,

        roles: {
          select: {
            value: true,
            type: true,
          },
        },
        refresh: {
          where: {
            expiration: String(expiration),
          },
          select: {
            id: true,
            expiration: true,
          },
        },
      },
    });
  }

  async removeRefreshToken(id: string) {
    if (id) {
      const check = await this.prisma.refresh.findFirst({
        where: {
          id,
        },
      });

      if (check) {
        const allRefresh = await this.prisma.refresh.findMany({
          select: { id: true, expiration: true },
        });

        const allExpired = allRefresh.filter(
          item => Number(item.expiration) < Number(check.expiration),
        );

        if (allExpired.length > 0) {
          const delIds = allExpired.map(i => i.id);
          return this.prisma.refresh.deleteMany({
            where: {
              id: {
                in: delIds,
              },
            },
          });
        }
      }
    }
  }
  //   const check = await this.prisma.refresh.findFirst({
  //     where: {
  //       id,
  //     },
  //   });
  //   if (check) {
  //     return this.prisma.refresh.delete({
  //       where: {
  //         id,
  //       },
  //     });
  //   }
  // }
}
