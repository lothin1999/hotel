import { Injectable } from '@nestjs/common';
import { Suite } from '@prisma/client';
import { PrismaService } from '../../database/prisma/prisma.service';
import { CreateSuiteDto } from './dto/create-suite.dto';
import { UpdateSuiteDto } from './dto/update-suite.dto';

@Injectable()
export class SuitesRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateSuiteDto): Promise<Suite> {
    return this.prisma.suite.create({ data });
  }

  async findById(id: number): Promise<Suite | null> {
    return this.prisma.suite.findUnique({ where: { id } });
  }

  async findAll(): Promise<Suite[]> {
    return this.prisma.suite.findMany();
  }

  async update(id: number, data: UpdateSuiteDto): Promise<Suite> {
    return this.prisma.suite.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<Suite> {
    return this.prisma.suite.delete({ where: { id } });
  }
}
