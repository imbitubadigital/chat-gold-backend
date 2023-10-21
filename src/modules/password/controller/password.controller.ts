import { Controller, Post, Body, HttpCode, UseGuards } from '@nestjs/common';

import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from '@nestjs/passport';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { ResponseVerificationCodeDto } from '../dto/response-verification-code.dto';
import { CodeVerificationDto } from '../dto/code-verification.dto';
import { ResponseLoginDto } from 'src/modules/auth/dto/response-login';
import { ChangePasswordDto } from '../dto/change-password.dto';
import {
  UserSession,
  UserToken,
} from 'src/modules/auth/decorators/user-token.decorator';
import { UpdatePasswordLoggedDto } from '../dto/change-password-logged.dto';
import { PasswordService } from '../services/password.service';

@ApiTags('Passwords')
@Controller('passwords')
export class PasswordController {
  constructor(private readonly passwordService: PasswordService) {}

  @ApiResponse({ status: 204, description: 'E-mail possivelmente enviado' })
  @ApiResponse({ status: 400, description: 'Campos obrigatórios' })
  @ApiResponse({ status: 404, description: 'E-mail não localizado no sistema' })
  @Post('forgot-password')
  @HttpCode(204)
  async forgot(@Body() body: ForgotPasswordDto): Promise<void> {
    return this.passwordService.forgotPassword(body);
  }

  @ApiResponse({
    status: 201,
    type: ResponseVerificationCodeDto,
    description: 'E-mail possivelmente enviado',
  })
  @ApiResponse({ status: 400, description: 'Campos obrigatórios' })
  @ApiResponse({ status: 404, description: 'E-mail não localizado no sistema' })
  @Post('code-verification')
  async verificationCode(
    @Body() body: CodeVerificationDto,
  ): Promise<ResponseVerificationCodeDto> {
    return this.passwordService.validateCode(body);
  }

  @ApiResponse({ status: 201, type: ResponseLoginDto })
  @ApiResponse({ status: 400, description: 'Campos obrigatórios' })
  @ApiResponse({ status: 404, description: 'Código inválido' })
  @Post('change-password')
  async changePassword(
    @Body() body: ChangePasswordDto,
  ): Promise<ResponseLoginDto> {
    return this.passwordService.changePassword(body);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 201, type: ResponseLoginDto })
  @ApiResponse({ status: 400, description: 'Campos obrigatórios' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Código inválido' })
  @ApiResponse({ status: 409, description: 'Cpf não confere' })
  @UseGuards(AuthGuard('jwt'))
  @Post('change-password-logged')
  async changePasswordLogged(
    @UserToken() user: UserSession,
    @Body() body: UpdatePasswordLoggedDto,
  ): Promise<ResponseLoginDto> {
    return this.passwordService.changePasswordLogged(body, user.id);
  }
}
