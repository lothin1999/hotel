import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { SocialLinksService } from './social-links.service';
import { CreateSocialLinkDto } from './dto/create-social-link.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('api/social-links')
export class SocialLinksController {
  constructor(private readonly socialLinksService: SocialLinksService) {}

  @Get()
  async findAll() {
    return this.socialLinksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.socialLinksService.findById(parseInt(id, 10));
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DEVELOPER', 'ADMIN')
  @Post()
  async create(@Body() createDto: CreateSocialLinkDto) {
    return this.socialLinksService.create(createDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DEVELOPER', 'ADMIN')
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: Partial<CreateSocialLinkDto>) {
    return this.socialLinksService.update(parseInt(id, 10), updateDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DEVELOPER', 'ADMIN')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.socialLinksService.remove(parseInt(id, 10));
  }
}
