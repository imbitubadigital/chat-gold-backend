import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

let alreadyConnectedPrisma = false;
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    if (!alreadyConnectedPrisma) {
      await this.$connect();
      alreadyConnectedPrisma = true;
    }
  }

  async enableShutdownHooks(app: INestApplication) {
    process.on('beforeExit', () => {
      app.close();
    });
  }
}
