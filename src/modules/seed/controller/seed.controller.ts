import { Controller, Post } from '@nestjs/common';

import { ApiExcludeController } from '@nestjs/swagger';
import { roles, users, rooms } from '../data';
import { SeedService } from '../services/seed.service';

@ApiExcludeController()
@Controller('seeds')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post()
  async create() {
    await this.seedService.createRoles(roles);
    await this.seedService.createUserAdmin(users);
    await this.seedService.createRooms(rooms);

    return {
      result: 'Seeds criadas com sucesso',
    };
  }
}
