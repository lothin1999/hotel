import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      datasources: {
        db: {
          url: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/hotel_db',
        },
      },
    });
  }

  async onModuleInit() {
    try {
      await this.$connect();
    } catch (e: any) {
      console.warn('[PrismaService]: Database connection offline mode: ' + e.message);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
