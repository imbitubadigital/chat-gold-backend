import { ApiProperty } from '@nestjs/swagger';

export class ResponseVerificationCodeDto {
  @ApiProperty({
    example: 'Código válido',
    description: 'Resposta de sucesso de código válido',
  })
  message: string;
}
