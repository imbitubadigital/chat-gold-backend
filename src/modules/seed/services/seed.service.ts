import { Injectable } from '@nestjs/common';

import { SeedRepository } from '../repository/seed.repository';
import { CreateUserAdminSeedDto } from '../dto/create-user-admin-seed.dto';
import { CreateRoleSeedDto } from '../dto/create-role-seed.dto';
import { CreateRoomsSeedDto } from '../dto/create-rooms-seed.dto';

@Injectable()
export class SeedService {
  constructor(private readonly seedRepository: SeedRepository) {}

  async createRoles(createRolesDto: CreateRoleSeedDto[]): Promise<void> {
    return this.seedRepository.createRoles(createRolesDto);
  }
  async createUserAdmin(
    createUserAdminSeedDto: CreateUserAdminSeedDto[],
  ): Promise<void> {
    return this.seedRepository.createUserAdmin(createUserAdminSeedDto);
  }

  async createRooms(createRoomsSeedDto: CreateRoomsSeedDto[]): Promise<void> {
    return this.seedRepository.createRooms(createRoomsSeedDto);
  }
}
