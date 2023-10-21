import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoomsSeedDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
