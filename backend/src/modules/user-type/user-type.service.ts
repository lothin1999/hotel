import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';

export interface CreateUserTypeDto {
  type: string;
  level: number;
}

export interface UpdateUserTypeDto {
  type?: string;
  level?: number;
}

@Injectable()
export class UserTypeService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.userType.findMany({
      orderBy: { level: 'asc' },
    });
  }

  async findById(id: number) {
    const userType = await this.prisma.userType.findUnique({
      where: { id },
    });
    if (!userType) {
      throw new NotFoundException(`UserType with ID ${id} not found`);
    }
    return userType;
  }

  async create(dto: CreateUserTypeDto) {
    const existing = await this.prisma.userType.findUnique({
      where: { type: dto.type },
    });
    if (existing) {
      throw new ConflictException(`UserType '${dto.type}' already exists`);
    }
    return this.prisma.userType.create({ data: dto });
  }

  async update(id: number, dto: UpdateUserTypeDto) {
    await this.findById(id);
    return this.prisma.userType.update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: number) {
    await this.findById(id);
    return this.prisma.userType.delete({ where: { id } });
  }
}
