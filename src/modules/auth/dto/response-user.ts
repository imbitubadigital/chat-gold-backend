import { ApiProperty } from '@nestjs/swagger';

import { RoleEntity } from 'src/modules/role/entities/role.entity';

export class ResponseUserDto {
  @ApiProperty({
    example: 'f30c3234-168c-45f6-ba96-27950c5b5469',
    description: 'Id do usuário',
  })
  id: string;

  @ApiProperty({
    example: 'John',
    description: 'Nome do usuário',
  })
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Sobrenome do usuário',
  })
  lastName: string;

  @ApiProperty({
    example: 'johndoe@email.com',
    description: 'E-mail do usuário',
  })
  email: string;

  @ApiProperty({
    example: '2022-05-31T12:49:55.693Z',
    description: 'Data de cadastro do usuário',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2022-05-31T12:49:55.693Z',
    description: 'Data de atualização do usuário',
  })
  updatedAt: Date;

  @ApiProperty({
    example: [
      {
        id: 'f30c3234-168c-45f6-ba96-27950c5b5469',
        value: 'USER',
        label: 'Administrador Master',
        type: 'USER',
      },
    ],
    description: 'Roles do usuário',
  })
  roles: RoleEntity[];
}
