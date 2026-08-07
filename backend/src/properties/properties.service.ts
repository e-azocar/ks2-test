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

@Injectable()
export class PropertiesService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    const properties = await this.prisma.property.findMany({
      where: { deletedAt: null },
      omit: {
        deletedAt: true,
      },
    });
    return properties;
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
