import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.services';
import { PrismapaginationService } from './prismapagination.service';

@Module({
  providers: [PrismaService, PrismapaginationService],
  exports: [PrismaService, PrismapaginationService],
})
export class PrismaModule {}
