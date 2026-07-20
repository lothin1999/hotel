import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { MotorCategoriesService } from './motor-categories.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('api/motor-categories')
export class MotorCategoriesController {
  constructor(private readonly categoriesService: MotorCategoriesService) {}

  @Get()
  async findAll() {
    return this.categoriesService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DEVELOPER', 'ADMIN')
  @Post()
  async create(@Body() data: any) {
    return this.categoriesService.create(data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DEVELOPER', 'ADMIN')
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    return this.categoriesService.update(parseInt(id, 10), data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DEVELOPER', 'ADMIN')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.categoriesService.remove(parseInt(id, 10));
  }
}
