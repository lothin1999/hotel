import { Injectable } from '@nestjs/common';
import { CreateUserLogDto } from './dto/create-user-log';
import { UserLogDto } from './dto/user-log.dto';

@Injectable()
export class UserLogRepository {
  private logs: UserLogDto[] = [];
  private idCounter = 1;

  async create(dto: CreateUserLogDto): Promise<UserLogDto> {
    const log: UserLogDto = {
      id: this.idCounter++,
      userId: dto.userId,
      action: dto.action,
      description: dto.description,
      ipAddress: dto.ipAddress,
      createdAt: new Date(),
    };
    this.logs.push(log);
    return log;
  }

  async findByUser(userId: number): Promise<UserLogDto[]> {
    return this.logs.filter((l) => l.userId === userId);
  }
}
