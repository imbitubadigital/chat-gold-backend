import { ApiProperty } from '@nestjs/swagger';

import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateDataUserDto {
  @ApiProperty({ example: 'John', description: 'Primeiro nome do cliente' })
  @IsString()
  @IsNotEmpty()
  firstName: string;
  @ApiProperty({ example: 'Doe', description: 'Sobrenome nome do cliente' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    example: 'johnjoe@email.com',
    description: 'E-mail do usuário',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '********',
    minLength: 8,
    description: 'Senha do usuário',
  })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({
    example: 1345,
    description: 'Código validador',
  })
  @IsNumber()
  code: number;

  @ApiProperty({
    example: 1345,
    description: 'Código validador',
  })
  @IsNumber()
  expiration: number;
}
