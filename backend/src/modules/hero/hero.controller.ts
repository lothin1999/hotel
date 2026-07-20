import { Controller, Get, Put, Param, Body, UseGuards } from '@nestjs/common';
import { HeroService } from './hero.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('api/hero')
export class HeroController {
  constructor(private readonly heroService: HeroService) {}

  @Get()
  async getHero() {
    return this.heroService.findFirst();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DEVELOPER', 'ADMIN')
  @Put(':id')
  async updateHero(@Param('id') id: string, @Body() data: any) {
    return this.heroService.update(parseInt(id, 10), data);
  }
}
