import { ApiProperty } from '@nestjs/swagger';

export class ResponseRefreshTokenSuccessDto {
  @ApiProperty({
    example:
      'yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmMzBjMzIzNC0xNjhjLTQ1ZjYtYmE5Ni0yNzk1MGM1YjU0NjkiLCJleHBpcmF0aW9uIjoxNjU0MDI3MzczLCJpYXQiOjE2NTQwMjczMTMsImV4cCI6MTY1NDAyNzM3M30.JS2kDh3HpJ-_SWr3Gzh6BGW8dSeo5Zv34A4mYKbfGbU',
    description: 'Novo token',
  })
  token: string;

  @ApiProperty({
    example:
      'yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmMzBjMzIzNC0xNjhjLTQ1ZjYtYmE5Ni0yNzk1MGM1YjU0NjkiLCJleHBpcmF0aW9uIjoxNjU0MDI3MzczLCJpYXQiOjE2NTQwMjczMTMsImV4cCI6MTY1NDAyNzM3M30.JS2kDh3HpJ-_SWr3Gzh6BGW8dSeo5Zv34A4mYKbfGbU',
    description: 'Novo refresh token',
  })
  refreshToken: string;
}
