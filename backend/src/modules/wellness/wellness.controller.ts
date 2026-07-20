import { Controller, Get, Put, Param, Body, UseGuards } from '@nestjs/common';
import { WellnessService } from './wellness.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('api/wellness')
export class WellnessController {
  constructor(private readonly wellnessService: WellnessService) {}

  @Get()
  async getWellness() {
    return this.wellnessService.findFirst();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DEVELOPER', 'ADMIN')
  @Put(':id')
  async updateWellness(@Param('id') id: string, @Body() data: any) {
    return this.wellnessService.update(parseInt(id, 10), data);
  }
}
