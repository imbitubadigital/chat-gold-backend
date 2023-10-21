import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
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
}
