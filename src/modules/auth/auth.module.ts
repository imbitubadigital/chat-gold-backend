import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthController } from './controller/auth.controller';
import { AuthRepository } from './repository/auth.repository';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_AUTH_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_AUTH_EXPIRATION,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, AuthRepository, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
