import { Injectable } from '@nestjs/common';

import { RoomRepository } from '../repository/room.repository';

import { RoomEntity } from '../entities/room.entity';

@Injectable()
export class RoomService {
  constructor(private readonly roomRepository: RoomRepository) {}

  async listAll(): Promise<RoomEntity[]> {
    return this.roomRepository.listAll();
  }
}
