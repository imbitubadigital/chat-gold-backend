import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CredentialAppleDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJpc3NvIGRldmVyaWEgc2VyIHVtIGlkIiwibmFtZSI6Im5hIG1vcmFsemluaGEgcXVlIHZvY8OqIHZlaW8gYXF1aSwgc8OzIHByYSB2ZXIgbyBxdWUgdGluaGEgbm8gdG9rZW4gZGUgZXhlbXBsbz8iLCJyb2xlcyI6Ik5PT0JfU0FJQk9ULE9CSVdBTl9LRU5PQkkiLCJpYXQiOjE1MTYyMzkwMjJ9.2FfsB_u6LxSQ0VQaJg9VQuAWE8r3DTPxkaaowwBw8PQ',
  })
  @IsString()
  @IsNotEmpty()
  accessTokenApple: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsOptional()
  name: string;
}
