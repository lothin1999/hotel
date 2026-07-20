import { Module } from '@nestjs/common';
import { DiningService } from './dining.service';
import { DiningController } from './dining.controller';

@Module({
  controllers: [DiningController],
  providers: [DiningService],
  exports: [DiningService],
})
export class DiningModule {}
