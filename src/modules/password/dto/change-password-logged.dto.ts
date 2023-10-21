import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ChangePasswordLoggedDto {
  @ApiProperty({
    example: 'ffd0e320-8bf1-40a3-b24e-aa0a7cbbe20b',
    description: 'Id do usuário',
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    example: '********',
    description: 'Senha atual',
  })
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({
    example: '********',
    minLength: 8,
    description: 'Nova senha do usuário',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

export class UpdatePasswordLoggedDto {
  @ApiProperty({
    example: '********',
    description: 'Senha atual',
  })
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({
    example: '********',
    minLength: 8,
    description: 'Nova senha do usuário',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
