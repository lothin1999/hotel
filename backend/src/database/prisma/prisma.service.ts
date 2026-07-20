import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private static createPoolAndAdapter() {
    const connectionString = process.env.DATABASE_URL || 'postgresql://hotel_user:hotel_pass@localhost:5432/hotel_db';
    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    return { pool, adapter };
  }

  private readonly pool: Pool;

  constructor() {
    const { pool, adapter } = PrismaService.createPoolAndAdapter();
    super({ adapter });
    this.pool = pool;
  }

  async onModuleInit() {
    try {
      await this.$connect();
    } catch (e: any) {
      console.warn('[PrismaService]: Database connection failed. Running in offline/stub mode: ' + e.message);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    await this.pool.end();
  }
}
