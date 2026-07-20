import { Module } from '@nestjs/common';
import { SuitesService } from './suites.service';
import { SuitesRepository } from './suites.repository';
import { SuitesController } from './suites.controller';

@Module({
  controllers: [SuitesController],
  providers: [SuitesService, SuitesRepository],
  exports: [SuitesService, SuitesRepository],
})
export class SuitesModule {}
