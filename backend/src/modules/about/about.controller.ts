import { Controller, Get, Put, Param, Body, UseGuards } from '@nestjs/common';
import { AboutService } from './about.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('api/about')
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  @Get()
  async getAbout() {
    return this.aboutService.findFirst();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DEVELOPER', 'ADMIN')
  @Put(':id')
  async updateAbout(@Param('id') id: string, @Body() data: any) {
    return this.aboutService.update(parseInt(id, 10), data);
  }
}
