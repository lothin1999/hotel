import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';

@Injectable()
export class WellnessService {
  constructor(private prisma: PrismaService) {}

  async findFirst() {
    const wellness = await this.prisma.wellness.findFirst();
    if (!wellness) {
      return this.prisma.wellness.create({
        data: {
          chipText: JSON.stringify({ en: 'Onsen Sanctuary', kh: 'មណ្ឌលស្ប៉ាអនសេន', zh: '火山温泉理疗' }),
          title: JSON.stringify({ en: 'Thermal <em>Transcendence</em>', kh: 'ការផ្លាស់ប្តូរជីវិតតាមបែប<em>អនសេន</em>', zh: '天然温泉<em>心灵超越</em>' }),
          desc: JSON.stringify({ en: "Our geothermal onsen facility draws from the island's volcanic aquifers...", kh: "អនសេនកម្តៅក្នុងដីរបស់យើង...", zh: "我们的地热温泉水源自海岛深处..." }),
          stats: JSON.stringify([
            { num: '8', label: { en: 'Private Villas', kh: 'វីឡាឯកជន', zh: '温泉理疗别庄' } },
            { num: '14', label: { en: 'Treatments', kh: '特色理疗疗程', zh: '特色理疗疗程' } }
          ])
        }
      });
    }
    return wellness;
  }

  async update(id: number, data: any) {
    return this.prisma.wellness.update({ where: { id }, data });
  }
}
