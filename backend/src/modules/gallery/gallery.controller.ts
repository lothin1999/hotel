import { Controller, Get, Put, Param, Body, UseGuards } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('api/gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Get()
  async getGallery() {
    return this.galleryService.findFirst();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DEVELOPER', 'ADMIN')
  @Put(':id')
  async updateGallery(@Param('id') id: string, @Body() data: any) {
    return this.galleryService.update(parseInt(id, 10), data);
  }
}
