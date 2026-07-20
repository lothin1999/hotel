import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';

@Injectable()
export class MotorCategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const categories = await this.prisma.motorCategory.findMany();
    if (categories.length === 0) {
      const defaults = [
        { categoryId: 'all', labelEn: 'All Machines', labelKh: 'ម៉ាស៊ីនទាំងអស់', labelZh: '全部重机' },
        { categoryId: 'adventure', labelEn: 'Adventure', labelKh: 'ម៉ូតូផ្សងព្រេង', labelZh: '探险拉力' },
        { categoryId: 'scrambler', labelEn: 'Scrambler', labelKh: 'ម៉ូតូស្គ្រែមប្លឺ', labelZh: '复古攀爬者' },
        { categoryId: 'naked', labelEn: 'Naked', labelKh: 'ម៉ូតូអាក្រាត', labelZh: '运动街车' },
        { categoryId: 'sport', labelEn: 'Sport', labelKh: 'ម៉ូតូស្ព័រ', labelZh: '仿赛跑车' },
        { categoryId: 'touring', labelEn: 'Touring', labelKh: 'ម៉ូតូធួរីង', labelZh: '旅行巡航' }
      ];

      for (const item of defaults) {
        await this.prisma.motorCategory.create({ data: item });
      }
      return this.prisma.motorCategory.findMany();
    }
    return categories;
  }

  async create(data: any) {
    return this.prisma.motorCategory.create({ data });
  }

  async update(id: number, data: any) {
    return this.prisma.motorCategory.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.motorCategory.delete({ where: { id } });
  }
}
