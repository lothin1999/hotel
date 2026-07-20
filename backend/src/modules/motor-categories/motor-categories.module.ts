import { Module } from '@nestjs/common';
import { MotorCategoriesService } from './motor-categories.service';
import { MotorCategoriesController } from './motor-categories.controller';

@Module({
  controllers: [MotorCategoriesController],
  providers: [MotorCategoriesService],
  exports: [MotorCategoriesService],
})
export class MotorCategoriesModule {}
