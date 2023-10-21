import { Room } from '@prisma/client';
import { JoinedRoomEntity } from 'src/modules/joinedRoom/entities/joindeRoom.entity';

export class RoomEntity implements Room {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  joinedRoom?: JoinedRoomEntity[];
}
