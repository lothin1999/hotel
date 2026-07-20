import { Controller, Get, Post, Body, Put, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('api/bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  async create(@Request() req: any, @Body() createDto: CreateBookingDto) {
    const userId = req.user?.id;
    return this.bookingsService.create(userId, createDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req: any) {
    const isPrivileged = req.user.role === 'DEVELOPER' || req.user.role === 'ADMIN';
    return this.bookingsService.findAll(isPrivileged ? undefined : req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.bookingsService.findById(parseInt(id, 10));
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DEVELOPER', 'ADMIN')
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateBookingDto) {
    return this.bookingsService.update(parseInt(id, 10), updateDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DEVELOPER', 'ADMIN')
  @Patch(':id/status')
  async updateStatus(@Param('id') id: string, @Body() body: { status?: string; paymentStatus?: string }) {
    return this.bookingsService.update(parseInt(id, 10), body as UpdateBookingDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DEVELOPER', 'ADMIN')
  @Patch(':id')
  async patchUpdate(@Param('id') id: string, @Body() updateDto: UpdateBookingDto) {
    return this.bookingsService.update(parseInt(id, 10), updateDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DEVELOPER', 'ADMIN')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.bookingsService.remove(parseInt(id, 10));
  }
}
