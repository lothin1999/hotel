import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';

@Injectable()
export class RoutesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.scenicRoute.findMany();
  }

  async findById(id: number) {
    const route = await this.prisma.scenicRoute.findUnique({ where: { id } });
    if (!route) {
      throw new NotFoundException(`Scenic route with ID ${id} not found`);
    }
    return route;
  }

  async create(data: any) {
    return this.prisma.scenicRoute.create({ data });
  }

  async update(id: number, data: any) {
    await this.findById(id);
    return this.prisma.scenicRoute.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findById(id);
    return this.prisma.scenicRoute.delete({ where: { id } });
  }
}
