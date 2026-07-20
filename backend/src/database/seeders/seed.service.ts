import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(private prisma: PrismaService) {}

  async seed() {
    this.logger.log('Seeding initial system data...');
    // Seed default admin user if not exists
    const adminCount = await this.prisma.user.count({
      where: { role: 'ADMIN' },
    });

    if (adminCount === 0) {
      this.logger.log('Creating default admin account...');
      // Admin creation placeholder
    }

    this.logger.log('Seeding completed successfully.');
  }
}
