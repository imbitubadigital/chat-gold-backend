import { Injectable } from '@nestjs/common';

import { RoomRepository } from '../repository/room.repository';

import { RoomEntity } from '../entities/room.entity';
import { JoinedRoomJoinProps } from 'src/modules/joinedRoom/interfaces/joinedRoom.interfaces';
import { JoinedRoomEntity } from 'src/modules/joinedRoom/entities/joindeRoom.entity';

@Injectable()
export class RoomService {
  constructor(private readonly roomRepository: RoomRepository) {}

  async listAll(): Promise<RoomEntity[]> {
    return this.roomRepository.listAll();
  }

  async checkRoomExist(roomId: string): Promise<boolean> {
    return this.roomRepository.checkRoomExist(roomId);
  }
  async joinRoom(payload: JoinedRoomJoinProps): Promise<JoinedRoomEntity> {
    return this.roomRepository.joinRoom(payload);
  }
  async leaveRoomByUserId(userId: string): Promise<void> {
    return this.roomRepository.leaveRoomByUserId(userId);
  }
  async leaveRoomBySocketId(socketId: string): Promise<void> {
    return this.roomRepository.leaveRoomBySocketId(socketId);
  }

  async listAllWithUsers(): Promise<any> {
    return this.roomRepository.listAllWithUsers();
  }
}
