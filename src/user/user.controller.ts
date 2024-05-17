import {
  Controller,
  Param,
  Delete,
  HttpStatus,
  Put,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SuccessResponse } from 'src/services/succes';
import { Prisma, User } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Delete('/:id')
  async deleteUser(
    @Param('id') userId: string,
  ): Promise<SuccessResponse<User>> {
    const model = await this.userService.deleteUser(userId);
    if (model) {
      return {
        statusCode: HttpStatus.OK,
        message: 'Succesfully Delete User',
        data: model,
      };
    }
  }
  @Put('/:id')
  async editUser(
    @Param('id') userId: string,
    @Body() data: Prisma.UserCreateInput,
  ) {
    const model = await this.userService.editUser(userId, data);
    if (model) {
      return {
        statusCode: HttpStatus.OK,
        message: 'Succesfully Edit',
        data: model,
      };
    }
  }
}
