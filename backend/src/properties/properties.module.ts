import { Module } from '@nestjs/common';
import { PropertiesController } from './properties.controller';
import { PropertiesService } from './properties.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [PropertiesController],
  providers: [PropertiesService, PrismaService, JwtService],
})
export class PropertiesModule {}
