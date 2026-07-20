import { NestFactory } from '@nestjs/core';
import { SeedModule } from './database/seed/seed.module';
import { SeedService } from './database/seed/seed.service';

async function runSeed() {
  const app = await NestFactory.createApplicationContext(SeedModule);
  const seedService = app.get(SeedService);
  await seedService.runSeed();
  await app.close();
  console.log('[Seed]: Database seeding completed successfully.');
}

runSeed().catch((err) => {
  console.error('[Seed]: Seeding failed:', err);
  process.exit(1);
});
