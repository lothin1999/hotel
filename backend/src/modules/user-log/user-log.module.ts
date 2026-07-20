import { Module } from '@nestjs/common';
import { UserLogService } from './user-log.service';
import { UserLogRepository } from './user-log.repository';

@Module({
  providers: [UserLogService, UserLogRepository],
  exports: [UserLogService],
})
export class UserLogModule {}
