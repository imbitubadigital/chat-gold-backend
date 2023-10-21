import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { hash } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoleSeedDto } from '../dto/create-role-seed.dto';

import { CreateUserAdminSeedDto } from '../dto/create-user-admin-seed.dto';
import { CreateRoomsSeedDto } from '../dto/create-rooms-seed.dto';

@Injectable()
export class SeedRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createRoles(createRolesDto: CreateRoleSeedDto[]): Promise<void> {
    await Promise.all(
      createRolesDto.map(async role => {
        const { value, ...rest } = role;
        if (!(await this.getRole(value))) {
          await this.prisma.role.create({
            data: {
              ...rest,
              value,
            },
          });
        }
      }),
    );
  }

  async createUserAdmin(
    createUserAdminSeedDto: CreateUserAdminSeedDto[],
  ): Promise<void> {
    await Promise.all(
      createUserAdminSeedDto.map(async user => {
        const { email, role, password, ...rest } = user;
        const checkRole = await this.getRole(role);

        if (!(await this.checkUser(email)) && checkRole) {
          const hashPassword = await hash(password, 8);

          const data: Prisma.UserCreateInput = {
            ...rest,
            email,
            password: hashPassword,
            active: true,
            roles: {
              connect: {
                id: checkRole.id,
              },
            },
          };

          await this.prisma.user.create({
            data,
          });
        }
      }),
    );
  }

  async createRooms(createRoomsSeedDto: CreateRoomsSeedDto[]): Promise<void> {
    await Promise.all(
      createRoomsSeedDto.map(async role => {
        const { name } = role;
        if (!(await this.getRoom(name))) {
          await this.prisma.room.create({
            data: {
              name,
            },
          });
        }
      }),
    );
  }

  private async getRoom(name: string) {
    return this.prisma.room.findUnique({
      where: {
        name,
      },
    });
  }
  private async getRole(value: string) {
    return this.prisma.role.findUnique({
      where: {
        value,
      },
    });
  }

  private async checkUser(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}
