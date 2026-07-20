import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';

export interface RegisterDeviceDto {
  userId?: number;
  deviceId: string;
  fcmToken: string;
  isLogin?: number;
}

@Injectable()
export class UserDeviceService {
  constructor(private readonly prisma: PrismaService) {}

  async registerDevice(dto: RegisterDeviceDto) {
    const existing = await this.prisma.userDevice.findFirst({
      where: { deviceId: dto.deviceId },
    });

    if (existing) {
      return this.prisma.userDevice.update({
        where: { id: existing.id },
        data: {
          userId: dto.userId || existing.userId,
          fcmToken: dto.fcmToken,
          isLogin: dto.isLogin !== undefined ? dto.isLogin : 1,
        },
      });
    }

    return this.prisma.userDevice.create({
      data: {
        userId: dto.userId,
        deviceId: dto.deviceId,
        fcmToken: dto.fcmToken,
        isLogin: dto.isLogin !== undefined ? dto.isLogin : 1,
      },
    });
  }

  async logoutDevice(deviceId: string) {
    const device = await this.prisma.userDevice.findFirst({
      where: { deviceId },
    });

    if (!device) {
      throw new NotFoundException(`Device '${deviceId}' not found`);
    }

    return this.prisma.userDevice.update({
      where: { id: device.id },
      data: { isLogin: 0 },
    });
  }

  async findByUserId(userId: number) {
    return this.prisma.userDevice.findMany({
      where: { userId, isLogin: 1 },
    });
  }
}
