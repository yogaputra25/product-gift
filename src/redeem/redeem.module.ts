import { Module } from '@nestjs/common';
import { RedeemService } from './redeem.service';
import { RedeemController } from './redeem.controller';
import { PrismaModule } from 'src/prisma/prisma.moudle';

@Module({
  imports: [PrismaModule],
  controllers: [RedeemController],
  providers: [RedeemService],
})
export class RedeemModule {}
