import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('api/routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @Get()
  async findAll() {
    return this.routesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.routesService.findById(parseInt(id, 10));
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DEVELOPER', 'ADMIN')
  @Post()
  async create(@Body() data: any) {
    return this.routesService.create(data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DEVELOPER', 'ADMIN')
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    return this.routesService.update(parseInt(id, 10), data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DEVELOPER', 'ADMIN')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.routesService.remove(parseInt(id, 10));
  }
}
