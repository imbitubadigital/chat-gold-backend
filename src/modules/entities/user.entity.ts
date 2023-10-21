import { User } from '@prisma/client';
import { CodeVerificationUserEntity } from './code-verification-user.entity';
import { RoleEntity } from '../role/entities/role.entity';

export class UserEntity implements User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;

  codes?: CodeVerificationUserEntity[];
  roles?: RoleEntity[];
}
