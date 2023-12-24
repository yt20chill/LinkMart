import { Controller, Delete, Get, Param, Post } from '@nestjs/common';

@Controller('api/offer')
export class OfferController {
  @Get('request/:id')
  getAllOffersByRequestId() {
    return [
      {
        offerId: '01BX5ZZKBKACTAV9WEVGEMMVRY',
        providerId: '01BX5ZZKBKACTAV9WEVGEMMVRY',
        providerName: 'Jason',
        efficiency: 5,
        attitude: 2,
        reviewCount: 10,
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
        reviewCount: 0,
        statusName: 'Status',
        price: 7000,
        estimatedProcessTime: 10,
        offerRemark: 'Sorry',
      },
    ];
  }

  @Delete(':id')
  declineOffer() {
    return { success: true };
  }

  @Post(':id')
  acceptOffer(@Param('id') id: string) {
    return {
      url: `/user/payment/${id}?addressId=1&price=100`,
      offerId: id,
      userAddressId: 1,
      price: 100,
    };
  }

  @Get('myOffer')
  getMyOffers() {
    return [
      {
        item: 'This',
        offerStatus: 'Active',
        estimatedProcessTime: 14,
        createdBy: 'Jason',
        primaryImage: 'https://picsum.photos/200',
        requestId: '01BX5ZZKBKACTAV9WEVGEMMVRZ',
        offerId: '01BX5ZZKBKACTAV9WEVGEMMVRZ',
        price: 200,
      },
      {
        item: 'This 2',
        offerStatus: 'Active',
        estimatedProcessTime: 5,
        createdBy: 'Jason',
        primaryImage: 'https://picsum.photos/200',
        requestId: '01BX5ZZKBKACTAV9WEVGEMMVRZ',
        offerId: '01BX5ZZKBKACTAV9WEVGEMMVRZ',
        price: 200,
      },
    ];
  }
}
