import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { UserDeviceService, RegisterDeviceDto } from './user-device.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('api/user-devices')
export class UserDeviceController {
  constructor(private readonly userDeviceService: UserDeviceService) {}

  @UseGuards(JwtAuthGuard)
  @Post('register')
  register(@Request() req: any, @Body() dto: RegisterDeviceDto) {
    return this.userDeviceService.registerDevice({
      ...dto,
      userId: req.user?.id || dto.userId,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Body('deviceId') deviceId: string) {
    return this.userDeviceService.logoutDevice(deviceId);
  }
}
