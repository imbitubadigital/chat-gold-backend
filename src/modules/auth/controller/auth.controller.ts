import { AuthService } from './../services/auth.service';
import { Body, Controller, Post, Headers } from '@nestjs/common';
import { CredentialsDto } from '../dto/credentials.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseLoginDto } from '../dto/response-login';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { ResponseRefreshTokenSuccessDto } from '../dto/response-refresh-token-success.dto';

@ApiTags('Auth User')
@Controller('/auth-user')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({ status: 201, type: ResponseLoginDto })
  @ApiResponse({ status: 400, description: 'Campos obrigatórios' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  @Post('/session')
  async sessionLogin(@Body() body: CredentialsDto): Promise<ResponseLoginDto> {
    return this.authService.session(body);
  }

  @ApiResponse({ status: 200, type: ResponseRefreshTokenSuccessDto })
  @ApiResponse({ status: 400, description: 'Campos obrigatórios' })
  @ApiResponse({
    status: 403,
    description: 'Refresh token inválido ou expirado',
  })
  @Post('refresh')
  async refreshToken(
    @Body() body: RefreshTokenDto,
  ): Promise<ResponseRefreshTokenSuccessDto> {
    return this.authService.refreshToken(body);
  }
}
