import { Controller, UseGuards, Get } from '@nestjs/common';

import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from '@nestjs/passport';

import { ResponseListRoomDto } from '../dto/response-list-rooms';
import { RoomService } from '../services/room.service';
import { RoomEntity } from '../entities/room.entity';

@ApiTags('Room')
@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @ApiBearerAuth()
  @ApiResponse({ status: 201, type: ResponseListRoomDto })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async listAll(): Promise<RoomEntity[]> {
    return this.roomService.listAll();
  }
}
