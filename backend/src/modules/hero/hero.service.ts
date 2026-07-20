import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';

@Injectable()
export class HeroService {
  constructor(private prisma: PrismaService) {}

  async findFirst() {
    const hero = await this.prisma.hero.findFirst();
    if (!hero) {
      return this.prisma.hero.create({
        data: {
          overline: JSON.stringify({ en: "The World's Most Private Retreat", kh: "រមណីយដ្ឋាន​ឯកជន​បំផុត​លើ​ពិភពលោក", zh: "全球最私密的隐逸圣地" }),
          titlePart1: JSON.stringify({ en: "Where", kh: "ទីកន្លែង​ដែល", zh: "在安静中" }),
          titlePart2: JSON.stringify({ en: "Silence is", kh: "ភាព​ស្ងប់ស្ងាត់​គឺ​ជា", zh: "重塑" }),
          titleGold: JSON.stringify({ en: "Luxury", kh: "ភាព​ប្រណីត", zh: "奢华" }),
          titlePart3: JSON.stringify({ en: "Reborn", kh: "នៃ​ការ​រស់​ឡើង​វិញ", zh: "新定义" }),
          description: JSON.stringify({ en: "An invitation-only estate nestled above a private coastline...", kh: "វិមាន​ឯកជន​នៅ​លើ​ឆ្នេរ​សមុទ្រ​ស្ងប់ស្ងាត់...", zh: "坐落于私密海岸线上的邀请制庄园..." }),
          bgImage: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1920&q=90&auto=format&fit=crop",
          stats: JSON.stringify([
            { num: "48", label: { en: "Private Suites", kh: "វិមានរមណីយដ្ឋាន", zh: "奢华套房" } },
            { num: "16", label: { en: "Motorcycles", kh: "ក្បួនម៉ូតូ", zh: "重型车队" } },
            { num: "5★", label: { en: "Forbes Rated", kh: "វាយតម្លៃដោយ Forbes", zh: "福布斯评级" } },
            { num: "15", label: { en: "Years of Excellence", kh: "ឆ្នាំនៃឧត្តមភាព", zh: "载卓越历程" } }
          ]),
          awardCard: JSON.stringify({
            stars: 5,
            title: { en: '"A destination that\ntranscends hospitality"', kh: '"គោលដៅ​ដែល​លើស​ពី\nការ​បដិសណ្ឋារកិច្ច"', zh: '"超越款待的独特旅程"' },
            source: "Condé Nast Traveller · 2024",
            badge: { en: "World's Best Resort", kh: "រមណីយដ្ឋាន​ល្អ​បំផុត​ក្នុង​លោក", zh: "世界最佳度假村" }
          })
        }
      });
    }
    return hero;
  }

  async update(id: number, data: any) {
    return this.prisma.hero.update({ where: { id }, data });
  }
}
