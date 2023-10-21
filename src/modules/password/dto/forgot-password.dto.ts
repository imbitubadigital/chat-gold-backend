import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({
    example: 'johndoe@email.com',
    description: 'E-mail o qual deseja recuperar a senha',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
