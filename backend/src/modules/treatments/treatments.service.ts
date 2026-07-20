import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';

@Injectable()
export class TreatmentsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.treatment.findMany();
  }

  async findById(id: number) {
    const item = await this.prisma.treatment.findUnique({ where: { id } });
    if (!item) {
      throw new NotFoundException(`Treatment with ID ${id} not found`);
    }
    return item;
  }

  async create(data: any) {
    return this.prisma.treatment.create({ data });
  }

  async update(id: number, data: any) {
    await this.findById(id);
    return this.prisma.treatment.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findById(id);
    return this.prisma.treatment.delete({ where: { id } });
  }
}
