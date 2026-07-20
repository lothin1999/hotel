import { Controller, Get, Post, Body, Put, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { BikesService } from './bikes.service';
import { CreateBikeDto } from './dto/create-bike.dto';
import { UpdateBikeDto } from './dto/update-bike.dto';
import { BikeMapper } from './mappers/bike.mapper';
import { BikeResponse } from './responses/bike.response';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('api/bikes')
export class BikesController {
  constructor(private readonly bikesService: BikesService) {}

  @Get()
  async findAll(@Query('category') category?: string): Promise<BikeResponse[]> {
    const bikes = await this.bikesService.findAll(category);
    return BikeMapper.toResponseCollection(bikes);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<BikeResponse> {
    const bike = await this.bikesService.findById(parseInt(id, 10));
    return BikeMapper.toResponse(bike);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DEVELOPER', 'ADMIN')
  @Post()
  async create(@Body() createBikeDto: CreateBikeDto): Promise<BikeResponse> {
    const bike = await this.bikesService.create(createBikeDto);
    return BikeMapper.toResponse(bike);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DEVELOPER', 'ADMIN')
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateBikeDto: UpdateBikeDto): Promise<BikeResponse> {
    const bike = await this.bikesService.update(parseInt(id, 10), updateBikeDto);
    return BikeMapper.toResponse(bike);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DEVELOPER', 'ADMIN')
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<BikeResponse> {
    const bike = await this.bikesService.remove(parseInt(id, 10));
    return BikeMapper.toResponse(bike);
  }
}
