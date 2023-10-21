import { Role } from '@prisma/client';
export class RoleEntity implements Role {
  id: string;
  value: string;
  label: string;
  type: string;
}
