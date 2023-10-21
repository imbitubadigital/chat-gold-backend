import { Module } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { SeedRepository } from './repository/seed.repository';
import { SeedController } from './controller/seed.controller';
import { SeedService } from './services/seed.service';

@Module({
  imports: [],
  controllers: [SeedController],
  providers: [SeedService, PrismaService, SeedRepository],
})
export class SeedModule {}
