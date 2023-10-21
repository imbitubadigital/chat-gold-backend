import { UserEntity } from './../../user/entities/user.entity';

import { UnauthorizedError } from './../../../common/errors/types/UnauthorizedError';
import { ResponseLoginDto } from './../dto/response-login';
import { NotFoundError } from './../../../common/errors/types/NotFoundError';

import { AuthRepository } from './../repository/auth.repository';
import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { Request } from 'express';

import { CredentialsDto } from '../dto/credentials.dto';
import { compare } from 'bcrypt';

import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { addSeconds, getUnixTime } from 'date-fns';

import { ResponseRefreshTokenSuccessDto } from '../dto/response-refresh-token-success.dto';
import { RefreshTokenExtract } from '../decorators/user-token.decorator';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async session(credentialsDto: CredentialsDto): Promise<ResponseLoginDto> {
    const { email: userEmail, password } = credentialsDto;

    const user = await this.authRepository.findUserByEmail(userEmail);

    if (!user) {
      throw new NotFoundError('Credenciais inválidas.');
    }

    if (!user.active) {
      throw new UnauthorizedError('Usuário inativo.');
    }

    const math = await this.checkPassword(password, user.password);

    if (!math) {
      throw new NotFoundError('Credenciais inválidas.');
    }

    return this.generalLogin(user);
  }

  private async generalLogin(user: UserEntity): Promise<ResponseLoginDto> {
    const rolesUser = user.roles.map(role => role.value);

    const { token, refreshToken } = await this.createTokenAndRefreshToken(
      rolesUser,
      user.id,
    );

    const { id, firstName, lastName, email, roles, createdAt, updatedAt } =
      user;

    return {
      user: {
        id,
        firstName,
        lastName,
        email,
        roles,
        createdAt,
        updatedAt,
      },
      token,
      refreshToken,
    };
  }

  async refreshToken(
    refreshTokenDto: RefreshTokenDto,
  ): Promise<ResponseRefreshTokenSuccessDto> {
    const { refreshToken } = refreshTokenDto;

    const refresh = verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET,
    ) as RefreshTokenExtract;

    if (refresh.userId) {
      const user = await this.authRepository.getRefreshToken(
        refresh.userId,
        refresh.expiration,
      );

      if (user.roles.filter(role => role.type === origin).length < 1) {
        throw new ForbiddenException(
          'Usuário sem permissão para acessar essa aplicação.',
        );
      }

      const currentDate = getUnixTime(new Date());

      if (
        !user ||
        !user.active ||
        user.refresh.length < 1 ||
        Number(
          user.refresh.find(
            item => item.expiration === String(refresh.expiration),
          ).expiration,
        ) < currentDate
      ) {
        throw new ForbiddenException('Refresh token expirado ou inválido.');
      }

      const rolesUser = user.roles.map(role => role.value);

      const dataRefresh = await this.createTokenAndRefreshToken(
        rolesUser,
        user.id,
      );

      await this.authRepository.removeRefreshToken(
        user.refresh.find(
          item => item.expiration === String(refresh.expiration),
        ).id,
      );

      return dataRefresh;
    } else {
      throw new ForbiddenException('Refresh token expirado ou inválido');
    }
  }

  private async createTokenAndRefreshToken(
    roles: string[],
    userId: string,
  ): Promise<ResponseRefreshTokenSuccessDto> {
    const jwtToken = await this.createAccessToken(userId, roles);

    const expiration = getUnixTime(
      addSeconds(new Date(), Number(process.env.JWT_REFRESH_EXPIRATION)),
    );

    const refreshToken = await this.createRefreshToken(userId, expiration);

    await this.authRepository.saveRefreshToken({
      user_id: userId,
      expiration,
    });

    return { token: jwtToken, refreshToken: refreshToken };
  }
  private async checkPassword(
    password: string,
    userPassword: string,
  ): Promise<boolean> {
    return compare(password, userPassword);
  }

  private async createAccessToken(
    userId: string,
    roles: string[],
  ): Promise<string> {
    return sign({ userId, roles }, process.env.JWT_AUTH_SECRET, {
      expiresIn: `${Number(process.env.JWT_AUTH_EXPIRATION)}s`,
    });
  }

  private async createRefreshToken(
    userId: string,
    expiration: number,
  ): Promise<string> {
    return sign({ userId, expiration }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: `${expiration}s`,
    });
  }

  public returnJwtExtractor(): (request: Request) => string {
    return AuthService.jwtExtractor;
  }

  private static jwtExtractor(request: Request): string {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Usuário não autorizado');
    }
    const [, token] = authHeader.split(' ');
    return token;
  }
}
