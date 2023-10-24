import { Message } from '@prisma/client';
import { RoomEntity } from 'src/modules/room/entities/room.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';

export class MessageEntity implements Message {
  id: number;
  content: string;
  type: string;
  userId: string;
  roomId: string;
  createdAt: Date;
  updatedAt: Date;
  user?: UserEntity;
  room?: RoomEntity;
}
