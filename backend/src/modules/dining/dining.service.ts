import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';

@Injectable()
export class DiningService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.diningOffer.findMany();
  }

  async findById(id: number) {
    const offer = await this.prisma.diningOffer.findUnique({ where: { id } });
    if (!offer) {
      throw new NotFoundException(`Dining offer with ID ${id} not found`);
    }
    return offer;
  }

  async create(data: any) {
    return this.prisma.diningOffer.create({ data });
  }

  async update(id: number, data: any) {
    await this.findById(id);
    return this.prisma.diningOffer.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findById(id);
    return this.prisma.diningOffer.delete({ where: { id } });
  }
}
