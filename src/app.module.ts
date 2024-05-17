import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { GiftModule } from './gift/gift.module';
import { PrismapaginationService } from './prisma/prismapagination.service';
import { RedeemModule } from './redeem/redeem.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, ConfigModule.forRoot(), GiftModule, RedeemModule, UserModule],
  controllers: [AppController],
  providers: [AppService, PrismapaginationService],
})
export class AppModule {}
