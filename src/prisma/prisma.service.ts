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
          url: process.env.POSTGRES_URL_NON_POOLING,
        },
      },
    });
  }
}
