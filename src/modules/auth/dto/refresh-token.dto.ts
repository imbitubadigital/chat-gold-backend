import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmMzBjMzIzNC0xNjhjLTQ1ZjYtYmE5Ni0yNzk1MGM1YjU0NjkiLCJyb2xlcyI6WyJhZG1pbiJdLCJpYXQiOjE2NTQwMDY2OTMsImV4cCI6MTY1NDA5MzA5M30.1F_6u-1xQi9vfoaQYBKeyoDB2WtJ86Zc2AcoC-tcl5E',
    description: 'Token refresh',
  })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
