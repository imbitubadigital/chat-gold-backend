import { CodeVerificationUser } from '@prisma/client';

export class CodeVerificationUserEntity implements CodeVerificationUser {
  id: string;
  code: number;
  expiration: string;
  createdAt: Date;
  userId: string;
}
