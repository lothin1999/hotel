import { Injectable } from '@nestjs/common';
import { CreateUserLogDto } from './dto/create-user-log';
import { UserLogDto } from './dto/user-log.dto';
import { UserLogRepository } from './user-log.repository';

@Injectable()
export class UserLogService {
  constructor(private readonly userLogRepository: UserLogRepository) {}

  async log(dto: CreateUserLogDto): Promise<void> {
    await this.userLogRepository.create(dto);
  }

  async findByUser(userId: number): Promise<UserLogDto[]> {
    return this.userLogRepository.findByUser(userId);
  }
}
