import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';

@Injectable()
export class AboutService {
  constructor(private prisma: PrismaService) {}

  async findFirst() {
    const about = await this.prisma.about.findFirst();
    if (!about) {
      return this.prisma.about.create({
        data: {
          chipText: JSON.stringify({ en: 'The Ankor Book Story', kh: 'ប្រវត្តិនៃ អង្គរ ប៊ុក', zh: '安可庄园传奇' }),
          title: JSON.stringify({ en: 'A Sanctuary Built for the Discerning Few', kh: 'ជម្រកស្នាក់នៅសម្រាប់ភ្ញៀវដ៏ឧត្តុង្គឧត្តម', zh: '为极少数人打造的避世圣地' }),
          body1: JSON.stringify({ en: 'Born from the belief that true luxury is not decoration but sensation...', kh: 'បង្កើតឡើងដោយជំនឿថា...', zh: '源于对“真正的奢华非关装饰...' }),
          body2: JSON.stringify({ en: 'Our fleet of 16 hand-selected motorcycles offers a dimension of freedom...', kh: 'ក្បួនម៉ូតូប្រណីត ១៦ គ្រឿង...', zh: '我们精心挑选的16台顶级重型摩托车队...' }),
          mainImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900&q=90&auto=format&fit=crop',
          secondaryImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80&auto=format&fit=crop',
          establishedYear: '2009',
          yearsExperience: 15,
          pillars: JSON.stringify([
            { icon: '🌊', name: { en: 'Private Shoreline', kh: 'ឆ្នេរសមុទ្រឯកជន', zh: '专属海岸线' }, desc: { en: '1.2km of exclusive white sand...', kh: 'ឆ្នេរខ្សាច់សក្បុស...', zh: '长达1.2公里的细腻白沙滩...' } }
          ])
        }
      });
    }
    return about;
  }

  async update(id: number, data: any) {
    return this.prisma.about.update({ where: { id }, data });
  }
}
