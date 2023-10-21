import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CodeVerificationDto {
  @ApiProperty({
    example: 'johndoe@email.com',
    description: 'E-mail o qual deseja validar o código',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 8409,
    description: 'Código de verificação recebido no e-mail',
  })
  @IsNumber()
  @IsNotEmpty()
  code: number;
}
