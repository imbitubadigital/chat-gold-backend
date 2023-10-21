import { Refresh } from '@prisma/client';

export class RefreshEntity implements Refresh {
  id: string;
  expiration: string;
  createdAt: Date;
  userId: string;
}
