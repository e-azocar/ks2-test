import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CatalogService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    const catalog = await this.prisma.propertyType.findMany({
      where: { deletedAt: null, isActive: true },
      omit: {
        deletedAt: true,
      },
    });
    return catalog;
  }
}
