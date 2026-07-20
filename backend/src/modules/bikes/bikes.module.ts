import { Module } from '@nestjs/common';
import { BikesService } from './bikes.service';
import { BikesRepository } from './bikes.repository';
import { BikesController } from './bikes.controller';

@Module({
  controllers: [BikesController],
  providers: [BikesService, BikesRepository],
  exports: [BikesService, BikesRepository],
})
export class BikesModule {}
