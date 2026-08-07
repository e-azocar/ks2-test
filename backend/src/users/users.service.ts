import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './users.dto';
import { UsersQuery } from 'src/types/users';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAll(query: UsersQuery) {
    const users = await this.prisma.user.findMany({
      where: {
        deletedAt: null,
      },
      omit: {
        password: true,
        deletedAt: true,
      },
      skip: (query.page! - 1) * query.limit!,
      take: query.limit,
      orderBy: {
        createdAt: query.order,
      },
    });

    const total = await this.prisma.user.count({
      where: {
        deletedAt: null,
      },
    });

    return {
      data: users,
      meta: {
        total,
        page: query.page,
        limit: query.limit,
        totalPages: Math.ceil(total / query.limit!),
      },
    };
  }

  async getOne(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
        deletedAt: null,
      },
      omit: {
        password: true,
        deletedAt: true,
      },
    });
  }

  async update(id: string, dto: UpdateUserDto, userId: string) {
    if (id !== userId) throw new ForbiddenException('No autorizado');

    return this.prisma.user.update({
      where: {
        id,
        deletedAt: null,
      },
      data: dto,
    });
  }

  async delete(id: string, userId: string) {
    if (id !== userId) throw new ForbiddenException('No autorizado');

    return this.prisma.user.update({
      where: {
        id,
        deletedAt: null,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
