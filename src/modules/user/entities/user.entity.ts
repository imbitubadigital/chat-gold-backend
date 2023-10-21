import { User } from '@prisma/client';
import { CodeVerificationUserEntity } from './code-verification-user.entity';
import { RoleEntity } from 'src/modules/role/entities/role.entity';
import { JoinedRoomEntity } from 'src/modules/joinedRoom/entities/joindeRoom.entity';

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
  joinedRoom?: JoinedRoomEntity[];
}
