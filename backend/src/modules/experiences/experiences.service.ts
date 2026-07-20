import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';

@Injectable()
export class ExperiencesService {
  constructor(private prisma: PrismaService) {}

  async findFirst() {
    const exp = await this.prisma.experience.findFirst();
    if (!exp) {
      return this.prisma.experience.create({
        data: {
          chipText: JSON.stringify({ en: 'Life at Ankor Book', kh: 'ជីវិតនៅ អង្គរ ប៊ុក', zh: '在安可庄园的生活' }),
          title: JSON.stringify({ en: 'Moments Beyond the Ordinary', kh: 'ខណៈពេលដ៏អស្ចារ្យលើសពីធម្មតា', zh: '超越平凡的非凡时刻' }),
          items: JSON.stringify([
            {
              tag: { en: 'Wellness', kh: 'សុខភាព', zh: '健康养生' },
              name: { en: 'Suspended Infinity Pool & Thermal Onsen', kh: 'អាងហែលទឹកគ្មានដែនកំណត់ និងស្ប៉ាអនសេនធម្មជាតិ', zh: '空中悬浮无边泳池与火山石温泉' },
              desc: { en: 'Float at the literal edge of the world...', kh: 'ហែលទឹកហាក់បីដូចជា...', zh: '在这座对抗重力的悬浮天际泳池中...' },
              image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1000&q=90&auto=format&fit=crop',
              alt: 'Infinity Pool'
            }
          ])
        }
      });
    }
    return exp;
  }

  async update(id: number, data: any) {
    return this.prisma.experience.update({ where: { id }, data });
  }
}
