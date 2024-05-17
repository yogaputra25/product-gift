import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { GiftService } from './gift.service';
import { CreateGiftDto } from './dto/create-gift.dto';
import { AuthGuard } from 'src/auth/auth.guard';

import { Gift, ImagesGift } from '@prisma/client';
import { PaginationResponse, SuccessResponse } from 'src/services/succes';
import { UpdateGiftDto } from './dto/update-gift.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

const storage = diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

@UseGuards(AuthGuard)
@Controller('gift')
export class GiftController {
  constructor(private readonly giftService: GiftService) {}
  @Post('/upload')
  @UseInterceptors(FileInterceptor('file', { storage }))
  async uploadImages(
    @UploadedFile() file: Express.Multer.File,
    @Body('userId') userId: string,
    @Body('giftId') giftId: string,
  ): Promise<SuccessResponse<ImagesGift>> {
    const model = await this.giftService.imageGift(
      file.originalname,
      userId,
      giftId,
    );
    if (model) {
      return {
        statusCode: HttpStatus.OK,
        message: 'Succesfully',
        data: model,
      };
    }
  }
  @Post()
  async create(
    @Body() createGiftDto: CreateGiftDto,
  ): Promise<SuccessResponse<Gift>> {
    const service = await this.giftService.createGift(createGiftDto);
    if (service) {
      return {
        statusCode: HttpStatus.OK,
        message: 'Succesfully Create Gift',
        data: service,
      };
    }
  }
  @Get()
  async listGift(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('orderBy') orderBy?: string,
    @Query('pagesDisplayed') pagesDisplayed?: string,
    @Query('sort') sort?: string,
  ): Promise<SuccessResponse<PaginationResponse<Gift[]>>> {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const pagesDisplayedNumber = parseInt(pagesDisplayed, 10);
    const service = await this.giftService.getPosts(
      pageNumber,
      limitNumber,
      orderBy,
      pagesDisplayedNumber,
      sort,
    );
    if (service) {
      return {
        statusCode: HttpStatus.OK,
        message: 'Succesfully',
        data: service,
      };
    }
  }
  @Get('/:id')
  async getGiftById(
    @Param('id') idGift: string,
  ): Promise<SuccessResponse<Gift>> {
    const idGiftParse = parseInt(idGift);
    const service = await this.giftService.getById(idGiftParse);
    if (service) {
      return {
        statusCode: HttpStatus.OK,
        message: 'Succesfully',
        data: service,
      };
    }
  }
  @Put('/:id')
  async putEditGift(
    @Param('id') idGift: string,
    @Body() data: UpdateGiftDto,
  ): Promise<SuccessResponse<Gift>> {
    const idGiftParse = parseInt(idGift);
    const service = await this.giftService.Edit(idGiftParse, data);
    if (service) {
      return {
        statusCode: HttpStatus.OK,
        message: 'Succesfully Edit Gift',
        data: service,
      };
    }
  }
  @Patch('/:id')
  async patchEditGift(
    @Param('id') idGift: string,
    @Body() data: UpdateGiftDto,
  ): Promise<SuccessResponse<Gift>> {
    const idGiftParse = parseInt(idGift);
    const service = await this.giftService.Edit(idGiftParse, data);
    if (service) {
      return {
        statusCode: HttpStatus.OK,
        message: 'Succesfully Edit Gift',
        data: service,
      };
    }
  }
  @Delete('/:id')
  async deleteGift(
    @Param('id') idGift: string,
  ): Promise<SuccessResponse<Gift>> {
    const idGiftParse = parseInt(idGift);
    const service = await this.giftService.deleteGift(idGiftParse);
    if (service) {
      return {
        statusCode: HttpStatus.OK,
        message: 'Succesfully Delete Gift',
        data: service,
      };
    }
  }
}
