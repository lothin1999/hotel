import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingsRepository {
  constructor(private prisma: PrismaService) {}

  async create(userId: number | undefined, reference: string, data: CreateBookingDto) {
    return this.prisma.booking.create({
      data: {
        ...data,
        reference,
        userId,
      },
      include: {
        user: true,
        suite: true,
        bike: true,
      },
    });
  }

  async findById(id: number) {
    return this.prisma.booking.findUnique({
      where: { id },
      include: {
        user: true,
        suite: true,
        bike: true,
      },
    });
  }

  async findAll(userId?: number) {
    return this.prisma.booking.findMany({
      where: userId ? { userId } : {},
      include: {
        user: true,
        suite: true,
        bike: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: number, data: UpdateBookingDto) {
    return this.prisma.booking.update({
      where: { id },
      data,
      include: {
        user: true,
        suite: true,
        bike: true,
      },
    });
  }

  async delete(id: number) {
    return this.prisma.booking.delete({ where: { id } });
  }
}
