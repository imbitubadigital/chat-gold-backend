import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleSeedDto {
  @IsString()
  @IsNotEmpty()
  value: string;

  @IsString()
  @IsNotEmpty()
  label: string;

  @IsString()
  @IsNotEmpty()
  type: string;
}
