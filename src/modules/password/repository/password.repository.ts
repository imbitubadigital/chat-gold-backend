import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';

import { PrismaService } from 'src/prisma/prisma.service';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { CreateCodeDto } from '../dto/create-code.dto';
import { CodeVerificationUserEntity } from 'src/modules/user/entities/code-verification-user.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';

@Injectable()
export class PasswordRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUserById(id: string): Promise<UserEntity> {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        codes: true,
      },
    });
  }
  async findUserByEmail(email: string): Promise<UserEntity> {
    return this.prisma.user.findUnique({
      where: { email },
      include: {
        codes: true,
        roles: true,
      },
    });
  }

  async createCodeVerification(
    createCodeDto: CreateCodeDto,
  ): Promise<CodeVerificationUserEntity> {
    const { userId, code, expiration } = createCodeDto;

    return this.prisma.codeVerificationUser.create({
      data: {
        code,
        expiration: String(expiration),
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async changePassword(
    clientChangePasswordDto: Omit<ChangePasswordDto, 'code'>,
  ): Promise<UserEntity> {
    const { email, password } = clientChangePasswordDto;
    const hashPassword = await hash(password, 8);
    return this.prisma.user.update({
      data: {
        password: hashPassword,
        active: true,
      },
      where: {
        email,
      },
    });
  }
}
