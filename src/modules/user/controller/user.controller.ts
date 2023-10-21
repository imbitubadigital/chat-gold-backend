import { Controller, Post, Body } from '@nestjs/common';

import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../dto/create-user.dto';
import { ResponseCreateUserDto } from '../dto/response-create-user';
import { UserService } from '../services/user.service';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @ApiResponse({ status: 201, type: ResponseCreateUserDto })
  @ApiResponse({ status: 400, description: 'Campos obrigatórios' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @Post('register')
  async create(
    @Body() createUserDto: CreateUserDto,
    // ): Promise<any> {
  ): Promise<ResponseCreateUserDto> {
    return this.userService.create(createUserDto);
  }
}
