import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { SuitesService } from './suites.service';
import { CreateSuiteDto } from './dto/create-suite.dto';
import { UpdateSuiteDto } from './dto/update-suite.dto';
import { SuiteMapper } from './mappers/suite.mapper';
import { SuiteResponse } from './responses/suite.response';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller(['api/suites', 'api/rooms'])
export class SuitesController {
  constructor(private readonly suitesService: SuitesService) {}

  @Get()
  async findAll(): Promise<SuiteResponse[]> {
    const suites = await this.suitesService.findAll();
    return SuiteMapper.toResponseCollection(suites);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<SuiteResponse> {
    const suite = await this.suitesService.findById(parseInt(id, 10));
    return SuiteMapper.toResponse(suite);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DEVELOPER', 'ADMIN')
  @Post()
  async create(@Body() createSuiteDto: CreateSuiteDto): Promise<SuiteResponse> {
    const suite = await this.suitesService.create(createSuiteDto);
    return SuiteMapper.toResponse(suite);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DEVELOPER', 'ADMIN')
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateSuiteDto: UpdateSuiteDto): Promise<SuiteResponse> {
    const suite = await this.suitesService.update(parseInt(id, 10), updateSuiteDto);
    return SuiteMapper.toResponse(suite);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DEVELOPER', 'ADMIN')
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<SuiteResponse> {
    const suite = await this.suitesService.remove(parseInt(id, 10));
    return SuiteMapper.toResponse(suite);
  }
}
