import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CredentialFacebookDto {
  @ApiProperty({
    example:
      'EAAVdFkg9SkYBANyao9fSDj0YVZA6pImutCNHv0BdGPEigc6G0B50BLPpMBmMZBabw49xay3CIo4sKe2CaUcBoNlrmdMWRjHoZA4OKwAkXzHoDlEu5rXVMsn2bJBs1yFrCAaKxDZAvRcJ6dloWZCWJ4g0Nw1TshZBZAXziV6ldQqW4DvVuHuBZCyAb',
    description: 'Token do facebook',
  })
  @IsString()
  @IsNotEmpty()
  accessTokenFacebook: string;
}
