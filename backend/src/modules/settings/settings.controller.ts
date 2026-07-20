import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { SettingsService, SystemSettings } from './settings.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('api/settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  getSettings(): SystemSettings {
    return this.settingsService.getSettings();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DEVELOPER', 'ADMIN')
  @Put()
  updateSettings(@Body() body: Partial<SystemSettings>): SystemSettings {
    return this.settingsService.updateSettings(body);
  }
}
