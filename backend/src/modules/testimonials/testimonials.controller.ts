import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { TestimonialsService } from './testimonials.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('api/testimonials')
export class TestimonialsController {
  constructor(private readonly testimonialsService: TestimonialsService) {}

  @Get()
  async findAll() {
    return this.testimonialsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.testimonialsService.findById(parseInt(id, 10));
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DEVELOPER', 'ADMIN')
  @Post()
  async create(@Body() data: any) {
    return this.testimonialsService.create(data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DEVELOPER', 'ADMIN')
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    return this.testimonialsService.update(parseInt(id, 10), data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DEVELOPER', 'ADMIN')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.testimonialsService.remove(parseInt(id, 10));
  }
}
