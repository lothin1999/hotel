import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { CreateSocialLinkDto } from './dto/create-social-link.dto';

@Injectable()
export class SocialLinksService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.socialLink.findMany();
  }

  async findById(id: number) {
    const link = await this.prisma.socialLink.findUnique({ where: { id } });
    if (!link) {
      throw new NotFoundException(`Social link with ID ${id} not found`);
    }
    return link;
  }

  async create(data: CreateSocialLinkDto) {
    return this.prisma.socialLink.create({ data });
  }

  async update(id: number, data: Partial<CreateSocialLinkDto>) {
    await this.findById(id);
    return this.prisma.socialLink.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findById(id);
    return this.prisma.socialLink.delete({ where: { id } });
  }
}
