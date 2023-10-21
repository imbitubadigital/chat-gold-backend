import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRefreshTokenDto {
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsNumber()
  @IsNotEmpty()
  expiration: number;
}
