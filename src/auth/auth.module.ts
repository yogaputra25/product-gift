import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PasswordService } from 'src/services/password.service';
import { PrismaModule } from 'src/prisma/prisma.moudle';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/services/constant';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30d' },
    }),
    PrismaModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, PasswordService],
})
export class AuthModule {}
