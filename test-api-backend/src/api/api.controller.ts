import { Controller, Get, Post } from '@nestjs/common';

@Controller('api')
export class ApiController {
  @Get('user')
  getUser() {
    return { username: 'Jason', providerId: '01BX5ZZKBKACTAV9WEVGEMMVRZ' };
  }
  @Post('offer/:id')
  acceptOffer() {
    return {
      offerId: '01BX5ZZKBKACTAV9WEVGEMMVRZ',
      userAddressId: 1,
      price: 1,
    };
  }
}
