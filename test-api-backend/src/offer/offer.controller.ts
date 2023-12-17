import { Controller, Get } from '@nestjs/common';

@Controller('api/offer')
export class OfferController {
  @Get('/request/:id')
  getAllOffersByRequestId() {
    return [
      {
        offerId: '01BX5ZZKBKACTAV9WEVGEMMVRY',
        providerId: '01BX5ZZKBKACTAV9WEVGEMMVRY',
        providerName: 'Jason',
        efficiency: 5,
        attitude: 2,
        statusName: 'Status',
        price: 10000,
        estimatedProcessTime: 4,
        offerRemark: 'I can help',
      },
      {
        offerId: '01BX5ZZKBKACTAV9WEVGEMMVRZ',
        providerId: '01BX5ZZKBKACTAV9WEVGEMMVS0',
        providerName: 'JasonLi',
        efficiency: 3,
        attitude: 5,
        statusName: 'Status',
        price: 7000,
        estimatedProcessTime: 10,
        offerRemark: 'Sorry',
      },
    ];
  }
}
