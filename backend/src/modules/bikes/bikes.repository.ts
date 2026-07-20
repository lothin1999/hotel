import { Injectable } from '@nestjs/common';
import { Bike } from '@prisma/client';
import { PrismaService } from '../../database/prisma/prisma.service';
import { CreateBikeDto } from './dto/create-bike.dto';
import { UpdateBikeDto } from './dto/update-bike.dto';

@Injectable()
export class BikesRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateBikeDto): Promise<Bike> {
    return this.prisma.bike.create({ data });
  }

  async findById(id: number): Promise<Bike | null> {
    return this.prisma.bike.findUnique({ where: { id } });
  }

  async findAll(category?: string): Promise<Bike[]> {
    return this.prisma.bike.findMany({
      where: category && category !== 'all' ? { category } : {},
    });
  }

  async update(id: number, data: UpdateBikeDto): Promise<Bike> {
    return this.prisma.bike.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<Bike> {
    return this.prisma.bike.delete({ where: { id } });
  }
}
