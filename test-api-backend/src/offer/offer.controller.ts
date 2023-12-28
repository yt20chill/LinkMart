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
        efficiency: 4.5,
        attitude: 2,
        reviewCount: 34,
        statusName: 'Status',
        price: 3000,
        estimatedProcessTime: 4,
        offerRemark: 'I can get this for you',
      },
      {
        offerId: '01BX5ZZKBKACTAV9WEVGEMMVRZ',
        providerId: '01BX5ZZKBKACTAV9WEVGEMMVS0',
        providerName: 'JasonLi',
        efficiency: 3,
        attitude: 5,
        reviewCount: 2,
        statusName: 'Status',
        price: 1900,
        estimatedProcessTime: 10,
        offerRemark: 'On your need',
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

  @Get(':id')
  getOfferDetails() {
    return {
      requestId: '01BX5ZZKBKACTAV9WEVGEMMVRZ',
      offerId: '01BX5ZZKBKACTAV9WEVGEMMVRZ',
      item: 'That',
      offerStatus: 'pending',
      createdBy: 'Jason',
      price: 100,
      estimatedProcessTime: 10,
      primaryImage: 'https://picsum.photos/200',
      offerRemark: 'Jason is handsome',
    };
  }
}
