import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { DiningService } from './dining.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('api/dining')
export class DiningController {
  constructor(private readonly diningService: DiningService) {}

  @Get()
  async findAll() {
    return this.diningService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.diningService.findById(parseInt(id, 10));
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DEVELOPER', 'ADMIN')
  @Post()
  async create(@Body() data: any) {
    return this.diningService.create(data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DEVELOPER', 'ADMIN')
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    return this.diningService.update(parseInt(id, 10), data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DEVELOPER', 'ADMIN')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.diningService.remove(parseInt(id, 10));
  }
}
