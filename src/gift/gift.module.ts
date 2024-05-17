import { Module } from '@nestjs/common';
import { GiftService } from './gift.service';
import { GiftController } from './gift.controller';

import { PrismaModule } from 'src/prisma/prisma.moudle';
import { Average } from 'src/services/average.service';

@Module({
  imports: [PrismaModule],
  controllers: [GiftController],
  providers: [GiftService, Average],
})
export class GiftModule {}
