import { Controller, Get } from '@nestjs/common';
import { CatalogService } from './catalog.service';

@Controller('tipos-inmueble')
export class CatalogController {
  constructor(private catalogService: CatalogService) {}

  @Get('/')
  async getAll() {
    return this.catalogService.getAll();
  }
}
