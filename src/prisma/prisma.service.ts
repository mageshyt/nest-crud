import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      log: ['error', 'info', 'warn'],
      errorFormat: 'pretty',
      datasources: {
        db: {
          url: 'postgres://default:mqkHhG2owjc5@ep-bitter-unit-72988414.us-east-1.postgres.vercel-storage.com:5432/verceldb',
        },
      },
    });
  }
}
