import { Controller, Get, Put, Param, Body, UseGuards } from '@nestjs/common';
import { ExperiencesService } from './experiences.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('api/experiences')
export class ExperiencesController {
  constructor(private readonly experiencesService: ExperiencesService) {}

  @Get()
  async getExperiences() {
    return this.experiencesService.findFirst();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DEVELOPER', 'ADMIN')
  @Put(':id')
  async updateExperiences(@Param('id') id: string, @Body() data: any) {
    return this.experiencesService.update(parseInt(id, 10), data);
  }
}
