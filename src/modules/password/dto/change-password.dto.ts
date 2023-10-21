import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsNumber,
  MinLength,
} from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({
    example: 'johndoe@email.com',
    description: 'E-mail o qual deseja recuperar a senha',
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

  @ApiProperty({
    example: '********',
    minLength: 8,
    description: 'Nova senha do usuário',
  })
  @IsString()
  @MinLength(8)
  password: string;
}
