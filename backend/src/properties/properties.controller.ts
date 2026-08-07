import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { AuthGuard, type AuthRequest } from 'src/auth/auth.guard';
import {
  CreatePropertyDto,
  UpdatePropertyDto,
  UpdatePropertyStatusDto,
} from './properties.dto';

@UseGuards(AuthGuard)
@Controller('inmuebles')
export class PropertiesController {
  constructor(private propertiesService: PropertiesService) {}

  @Get('/')
  async getAll() {
    return this.propertiesService.getAll();
  }

  @Get('/:id')
  async getOne(@Param('id') id: string) {
    return this.propertiesService.getOne(id);
  }

  @Post('/')
  async create(@Body() dto: CreatePropertyDto, @Req() req: AuthRequest) {
    return this.propertiesService.create(dto, req.user!.sub);
  }

  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdatePropertyDto,
    @Req() req: AuthRequest,
  ) {
    return this.propertiesService.update(id, dto, req.user!.sub);
  }

  @Patch('/:id/estado')
  async updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdatePropertyStatusDto,
    @Req() req: AuthRequest,
  ) {
    return this.propertiesService.updateStatus(id, dto.status, req.user!.sub);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string, @Req() req: AuthRequest) {
    return this.propertiesService.delete(id, req.user!.sub);
  }
}
