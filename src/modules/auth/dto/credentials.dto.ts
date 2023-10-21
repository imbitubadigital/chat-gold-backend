import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export enum UserOrigin {
  CLIENT = 'CLIENT',
  ADMIN = 'ADMIN',
  COMPANY = 'COMPANY',
}
export class CredentialsDto {
  @ApiProperty({
    example: 'johndoe@email.com',
    description: 'E-mail do usuário',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '********', description: 'Senha do usuário' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
