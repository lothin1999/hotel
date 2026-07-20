import { Injectable, NotFoundException } from '@nestjs/common';
import { BookingsRepository } from './bookings.repository';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingsService {
  constructor(private bookingsRepository: BookingsRepository) {}

  async create(userId: number | undefined, createBookingDto: CreateBookingDto) {
    const reference = 'VEL-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    return this.bookingsRepository.create(userId, reference, createBookingDto);
  }

  async findById(id: number) {
    const booking = await this.bookingsRepository.findById(id);
    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
    return booking;
  }

  async findAll(userId?: number) {
    return this.bookingsRepository.findAll(userId);
  }

  async update(id: number, updateBookingDto: UpdateBookingDto) {
    await this.findById(id);
    return this.bookingsRepository.update(id, updateBookingDto);
  }

  async remove(id: number) {
    await this.findById(id);
    return this.bookingsRepository.delete(id);
  }
}
