import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UsersService } from './users.service';
import type { AuthRequest } from 'src/types/auth';
import { UpdateUserDto } from './users.dto';
import type { UsersQuery } from 'src/types/users';

@UseGuards(AuthGuard)
@Controller('usuarios')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/')
  async getAll(@Query() query: UsersQuery) {
    return this.usersService.getAll({
      ...query,
      page: Number(query.page) || 1,
      limit: Number(query.limit) || 10,
      order: query.order || 'desc',
    });
  }

  @Get('/:id')
  async getOne(@Param('id') id: string) {
    return this.usersService.getOne(id);
  }

  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
    @Req() req: AuthRequest,
  ) {
    return this.usersService.update(id, dto, req.user!.sub);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string, @Req() req: AuthRequest) {
    return this.usersService.delete(id, req.user!.sub);
  }
}
