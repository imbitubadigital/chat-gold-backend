import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles: string[] = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    if (!roles) {
      return true;
    }

    const request = await context.switchToHttp().getRequest();
    const { user } = request;

    const hasRole = () =>
      user.roles.some((role: string) => roles.includes(role));

    if (user && user.roles && hasRole()) {
      return true;
    }
    throw new ForbiddenException('Usuário não tem permissão');
  }
}
