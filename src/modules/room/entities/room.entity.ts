import { Room } from '@prisma/client';
import { JoinedRoomEntity } from 'src/modules/joinedRoom/entities/joindeRoom.entity';

export class RoomEntity implements Room {
  id: string;
  name: string;
  createdAt: Date;

  joinedRoom?: JoinedRoomEntity[];
}
