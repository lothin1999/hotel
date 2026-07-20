import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { BookingsModule } from '../bookings/bookings.module';
import { SuitesModule } from '../suites/suites.module';
import { BikesModule } from '../bikes/bikes.module';

@Module({
  imports: [BookingsModule, SuitesModule, BikesModule],
  controllers: [ReportsController],
  providers: [ReportsService],
  exports: [ReportsService]
})
export class ReportsModule {}
