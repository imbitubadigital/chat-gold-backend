import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

import { JwtPayload } from '../dto/jwt-payload';

export type RefreshTokenExtract = {
  userId: string;
  code: number;
  expiration: number;
  iat: number;
  exp: number;
};

export type UserSession = Pick<JwtPayload, 'roles'> & {
  id: string;
  companyId: string | null;
};

export interface CustomRequest extends Request {
  user: UserSession;
}
export const UserToken = createParamDecorator(
  (data: unknown, context: ExecutionContext): UserSession | undefined => {
    const http = context.switchToHttp();
    const request = http.getRequest<CustomRequest>();
    return request.user;
  },
);
