import { ApiProperty } from '@nestjs/swagger';

export class ResponseCreateUserDto {
  @ApiProperty({
    example: 'f30c3234-168c-45f6-ba96-27950c5b5469',
    description: 'Id do cliente',
  })
  id: string;

  @ApiProperty({
    example: 'John',
    description: 'Nome do cliente',
  })
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Sobrenome do cliente',
  })
  lastName: string;

  @ApiProperty({
    example: 'johndoe@email.com',
    description: 'E-mail do cliente',
  })
  email: string;
}
