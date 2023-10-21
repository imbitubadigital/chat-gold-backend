import { ApiProperty } from '@nestjs/swagger';

export class ResponseListRoomDto {
  @ApiProperty({
    example: 'f30c3234-168c-45f6-ba96-27950c5b5469',
    description: 'Uuid da sala',
  })
  id: number;

  @ApiProperty({
    example: 'Java',
    description: 'Nome da sala',
  })
  name: string;
  @ApiProperty({
    example: '2022-05-31T12:49:55.693Z',
    description: 'Data de criação',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2022-05-31T12:49:55.693Z',
    description: 'Data de atualização',
  })
  updatedAt: Date;
}
