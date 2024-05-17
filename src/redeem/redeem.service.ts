import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { RedeemedGift } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.services';

@Injectable()
export class RedeemService {
  constructor(private prisma: PrismaService) {}
  async createRedeemGifts(userId: number, giftIds: number[]) {
    const gifts = await this.prisma.gift.findMany({
      where: {
        id: {
          in: giftIds,
        },
      },
    });

    const checkGifts = gifts.filter((gift) => gift.stock <= 0);
    if (checkGifts.length > 0) {
      throw new BadRequestException(
        `Some gifts are out of stock: ${checkGifts.map((gift) => gift.id).join(', ')}`,
      );
    }

    const redeemedgifts: RedeemedGift[] = [];
    for (const gift of gifts) {
      await this.prisma.gift.update({
        where: { id: gift.id },
        data: {
          stock: gift.stock - 1,
        },
      });
      const redeemedGiftCreate = await this.prisma.redeemedGift.create({
        data: {
          userId,
          giftId: gift.id,
        },
      });

      redeemedgifts.push(redeemedGiftCreate);
      console.log(redeemedgifts);
    }
    return redeemedgifts;
  }

  async rating(
    redeemedGiftId: number,
    rating: number,
    userId: number,
  ): Promise<RedeemedGift> {
    const redeemedGift = await this.prisma.redeemedGift.findUnique({
      where: { id: redeemedGiftId },
      include: { gift: true },
    });

    if (rating > 5.0) {
      throw new NotFoundException(`Rating ${rating} not found`);
    }

    if (!redeemedGift) {
      throw new NotFoundException(
        `Redeemed gift with ID ${redeemedGiftId} not found`,
      );
    }

    if (redeemedGift.userId !== userId) {
      throw new UnauthorizedException(
        'You are not authorized to rate this redeemed gift',
      );
    }
    // const roundedRating = Math.round(rating * 2) / 2;
    const updatedRedeemedGift = await this.prisma.redeemedGift.update({
      where: { id: redeemedGiftId },
      data: { rating: rating },
    });
    return updatedRedeemedGift;
  }
}
