import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';

@Injectable()
export class TestimonialsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.testimonial.findMany();
  }

  async findById(id: number) {
    const item = await this.prisma.testimonial.findUnique({ where: { id } });
    if (!item) {
      throw new NotFoundException(`Testimonial with ID ${id} not found`);
    }
    return item;
  }

  async create(data: any) {
    return this.prisma.testimonial.create({ data });
  }

  async update(id: number, data: any) {
    await this.findById(id);
    return this.prisma.testimonial.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findById(id);
    return this.prisma.testimonial.delete({ where: { id } });
  }
}
