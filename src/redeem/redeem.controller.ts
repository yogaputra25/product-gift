import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { RedeemService } from './redeem.service';
import { SuccessResponse } from 'src/services/succes';
import { RedeemedGift } from '@prisma/client';

@Controller('/gifts/id')
export class RedeemController {
  constructor(private readonly redeemService: RedeemService) {}

  @Post('/redeem')
  async redeemedGifts(
    @Body('idUser') idUser: number,
    @Body('giftIds') giftIds: number[],
  ): Promise<SuccessResponse<RedeemedGift[]>> {
    const service = await this.redeemService.createRedeemGifts(idUser, giftIds);

    if (service) {
      return {
        statusCode: HttpStatus.OK,
        message: 'Succesfully',
        data: service,
      };
    }
  }
  @Post('/rating')
  async makeRating(
    @Body('idRedeem') idRedeem: number,
    @Body('rating') rating: number,
    @Body('idUser') idUser: number,
  ): Promise<SuccessResponse<RedeemedGift>> {
    const service = await this.redeemService.rating(idRedeem, rating, idUser);
    if (service) {
      return {
        statusCode: HttpStatus.OK,
        message: 'Succesfully',
        data: service,
      };
    }
  }
}
