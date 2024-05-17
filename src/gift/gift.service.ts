import { Injectable, NotFoundException } from '@nestjs/common';
import { Gift, Prisma } from '@prisma/client';
import { Average } from 'src/services/average.service';
import { PrismaService } from 'src/prisma/prisma.services';
import { PaginationResponse } from 'src/services/succes';
import { UpdateGiftDto } from './dto/update-gift.dto';

interface GiftAdd extends Gift {
  averageRating: number | null;
}

interface imagesGiftData {
  userId: number;
  giftId: number;
  image: string;
}

@Injectable()
export class GiftService {
  constructor(
    private prisma: PrismaService,
    private average: Average,
  ) {}
  async imageGift(file: string, userId: string, giftId: string) {
    const userIdConvert = parseInt(userId);
    const giftIdConvert = parseInt(giftId);

    const data: imagesGiftData = {
      giftId: giftIdConvert,
      image: '/' + file,
      userId: userIdConvert,
    };
    const checkData = await this.prisma.imagesGift.findUnique({
      where: { giftId: giftIdConvert },
    });

    if (checkData == null) {
      const model = await this.prisma.imagesGift.create({ data });
      return model;
    } else {
      const update = await this.prisma.imagesGift.update({
        where: { giftId: giftIdConvert },
        data,
      });
      return update;
    }
  }
  async createGift(data: Prisma.GiftCreateInput): Promise<Gift> {
    const model = await this.prisma.gift.create({ data });
    return model;
  }
  async getPosts(
    page?: number,
    limit?: number,
    orderBy?: string,
    pagesDisplayed?: number,
    sort?: string,
  ): Promise<PaginationResponse<Gift[]>> {
    const pageNumber = page || 1;
    const limitNumber = limit || 10;
    const orderByField = orderBy || 'createdAt';
    const pagesDisplayedNumber = pagesDisplayed || 5;
    const sorting = sort || 'asc';
    const skip = (pageNumber - 1) * limitNumber;
    const [posts, total] = await this.prisma.$transaction([
      this.prisma.gift.findMany({
        skip,
        take: limitNumber,
        orderBy: {
          [orderByField]: sorting, //asc or 'desc' based on your requirement
        },
        include: {
          user: { select: { id: true, email: true, name: true } },
          redeem: { select: { rating: true } },
          image: { select: { image: true } },
        },
      }),
      this.prisma.gift.count(),
    ]);

    // Lakukan apa yang Anda inginkan dengan data yang telah dimodifikasi
    const addAverage = posts.map((post) => {
      const averageRating = this.average.roundRating(
        this.average.calculateAverageRating(post.redeem),
      );

      return { ...post, averageRating };
    });

    const totalPages = Math.ceil(total / limit);
    const halfPagesDisplayed = Math.floor(pagesDisplayedNumber / 2);
    let startPage = Math.max(page - halfPagesDisplayed, 1);
    const endPage = Math.min(startPage + pagesDisplayedNumber - 1, totalPages);

    if (endPage - startPage + 1 < pagesDisplayedNumber) {
      startPage = Math.max(endPage - pagesDisplayedNumber + 1, 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return {
      data: addAverage,
      total,
      page,
      limit,
      totalPages,
    };
  }

  async getById(idGift: number): Promise<GiftAdd> {
    const post = await this.prisma.gift.findUnique({
      where: { id: idGift },
      include: {
        user: { select: { id: true, email: true, name: true } },
        redeem: { select: { rating: true } },
        image: { select: { image: true } },
      },
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${idGift} not found`);
    }
    const averageRating = this.average.roundRating(
      this.average.calculateAverageRating(post.redeem),
    );

    return { ...post, averageRating };
  }
  async Edit(idGift: number, data: UpdateGiftDto): Promise<Gift> {
    return this.prisma.gift.update({ where: { id: idGift }, data });
  }
  async deleteGift(idGift: number) {
    return this.prisma.gift.delete({ where: { id: idGift } });
  }
}
