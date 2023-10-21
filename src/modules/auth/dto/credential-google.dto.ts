import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CredentialGoogleDto {
  @ApiProperty({
    example:
      'ya29.a0AeTM1icgulnoK7ExUDlTneWH9HFkT3jD9uz8d35Ui32-fTdEyMRXVq8nCUxIdwVwlMqWCjXvneVS17KEvZKV_ni2pu6OQeY26j3h4r70hsjXtZnUarbYuSWCi1ZcR4tijn-l8RDKHOrHGOGdgmXSlNXtQeSaNQaCgYKAfgSARASFQHWtWOmR6ZWsj2L5Dvq3a4pqu_5Mg0x84',
    description: 'Token do facebook',
  })
  @IsString()
  @IsNotEmpty()
  accessTokenGoogle: string;
}
