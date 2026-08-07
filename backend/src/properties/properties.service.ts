import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreatePropertyDto,
  UpdatePropertyDto,
  UpdatePropertyStatusDto,
} from './properties.dto';
import { PropertiesQuery } from 'src/types/properties';

@Injectable()
export class PropertiesService {
  constructor(private prisma: PrismaService) {}

  async getAll(query: PropertiesQuery, userId: string) {
    const where = {
      deletedAt: null,
      ...(query.onlyMine && { sellerId: userId }),
      ...(query.status && { status: query.status }),
      ...(query.propertyTypeId && { propertyTypeId: query.propertyTypeId }),
      ...(query.minPrice !== undefined && { price: { gte: query.minPrice } }),
      ...(query.maxPrice !== undefined && { price: { lte: query.maxPrice } }),
    };

    const properties = await this.prisma.property.findMany({
      where: {
        ...where,
        ...(query.search && {
          address: { contains: query.search, mode: 'insensitive' },
        }),
      },
      omit: {
        deletedAt: true,
      },
      skip: (query.page! - 1) * query.limit!,
      take: query.limit,
      orderBy: {
        [query.orderBy!]: query.order,
      },
    });

    const total = await this.prisma.property.count({
      where: {
        ...where,
        ...(query.search && {
          address: { contains: query.search, mode: 'insensitive' },
        }),
      },
    });

    return {
      data: properties,
      meta: {
        total,
        page: query.page,
        limit: query.limit,
        totalPages: Math.ceil(total / query.limit!),
      },
    };
  }

  async getOne(id: string) {
    const property = await this.prisma.property.findUnique({
      where: { id },
      omit: {
        deletedAt: true,
      },
    });
    return property;
  }

  async create(dto: CreatePropertyDto, sellerId: string) {
    const property = await this.prisma.property.create({
      data: {
        ...dto,
        sellerId,
      },
    });
    return property;
  }

  async update(id: string, dto: UpdatePropertyDto, sellerId: string) {
    const existingProperty = await this.prisma.property.findUnique({
      where: { id, sellerId },
    });
    if (!existingProperty)
      throw new NotFoundException('Inmueble no encontrado');

    if (existingProperty.status === 'SOLD')
      throw new ConflictException('No se puede actualizar un inmueble vendido');

    const property = await this.prisma.property.update({
      where: { id, sellerId },
      data: {
        ...dto,
      },
    });
    return property;
  }

  async updateStatus(
    id: string,
    status: UpdatePropertyStatusDto['status'],
    sellerId: string,
  ) {
    const existingProperty = await this.prisma.property.findUnique({
      where: { id, sellerId },
    });
    if (!existingProperty)
      throw new NotFoundException('Inmueble no encontrado');

    if (existingProperty.status === 'SOLD')
      throw new ConflictException('No se puede actualizar un inmueble vendido');

    if (existingProperty.status === 'AVAILABLE' && status === 'SOLD')
      throw new ConflictException(
        'No se puede vender un inmueble que no haya sido reservado',
      );

    const property = await this.prisma.property.update({
      where: { id, sellerId },
      data: {
        status,
      },
    });
    return property;
  }

  async delete(id: string, sellerId: string) {
    const existingProperty = await this.prisma.property.findUnique({
      where: { id, sellerId },
    });
    if (!existingProperty)
      throw new NotFoundException('Inmueble no encontrado');

    if (existingProperty.status === 'SOLD')
      throw new ConflictException('No se puede eliminar un inmueble vendido');

    const property = await this.prisma.property.update({
      where: { id, sellerId },
      data: {
        deletedAt: new Date(),
      },
    });
    return property;
  }
}
