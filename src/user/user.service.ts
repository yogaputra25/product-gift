import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.services';
import { PasswordService } from 'src/services/password.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private passwordService: PasswordService,
  ) {}

  async deleteUser(userId: string) {
    const userIdConvert = parseInt(userId);

    const model = await this.prisma.user.delete({
      where: { id: userIdConvert },
    });
    return model;
  }

  async editUser(userId: string, data: Prisma.UserCreateInput) {
    const userIdConvert = parseInt(userId);
    console.log(data);

    // const user = await this.prisma.user.findFirst({
    //   where: { id: userIdConvert },
    // });
    // if (!user) {
    //   throw new BadRequestException('Invalid credentials');
    // }
    const passwordHash = await this.passwordService.hashPassword(data.password);
    data.password = passwordHash;
    const model = await this.prisma.user.update({
      where: { id: userIdConvert },
      data,
    });
    return model;
  }
}
