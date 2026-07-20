import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';

@Injectable()
export class GalleryService {
  constructor(private prisma: PrismaService) {}

  async findFirst() {
    const gallery = await this.prisma.gallery.findFirst();
    if (!gallery) {
      return this.prisma.gallery.create({
        data: {
          chipText: JSON.stringify({ en: 'The Estate', kh: 'វិមានរមណីយដ្ឋាន', zh: '至尊府邸' }),
          title: JSON.stringify({ en: 'Every Frame a Memory', kh: 'រាល់ប្លង់រូបភាពគឺជាការចងចាំ', zh: '每一帧皆是永恒记忆' }),
          description: JSON.stringify({ en: 'Ankor Book was designed to be seen...', kh: 'អង្គរ ប៊ុក ត្រូវបានរចនាឡើង...', zh: '安可庄园的设计初衷...' }),
          items: JSON.stringify([
            { label: { en: 'The Main Estate', kh: 'វិមានធំ', zh: '主庄园全貌' }, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=900&q=85&auto=format&fit=crop', alt: 'Resort' },
            { label: { en: 'Infinity Pool', kh: 'អាងហែលទឹកគ្មានដែនកំណត់', zh: '悬浮无边泳池' }, image: 'https://images.unsplash.com/photo-1549294413-26f195200c16?w=700&q=85&auto=format&fit=crop', alt: 'Pool' }
          ])
        }
      });
    }
    return gallery;
  }

  async update(id: number, data: any) {
    return this.prisma.gallery.update({ where: { id }, data });
  }
}
