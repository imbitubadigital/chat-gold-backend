import { JoinedRoom } from '@prisma/client';

export class JoinedRoomEntity implements JoinedRoom {
  userId: string;
  roomId: number;
  socketId: string;
  id: number;
  name: string;
  createdAt: Date;
}
