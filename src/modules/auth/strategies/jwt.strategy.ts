import { AuthService } from './../services/auth.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { JwtPayload } from '../dto/jwt-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: authService.returnJwtExtractor(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_AUTH_SECRET,
    });
  }

  async validate(
    jwtPayload: JwtPayload,
  ): Promise<
    Pick<JwtPayload, 'roles'> & { id: string; companyId: string | null }
  > {
    return {
      id: jwtPayload.userId,
      roles: jwtPayload.roles,
      companyId: jwtPayload.companyId,
    };
  }
}
