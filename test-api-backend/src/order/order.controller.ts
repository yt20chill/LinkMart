import { Controller, Get } from '@nestjs/common';

@Controller('api/order')
export class OrderController {
  @Get()
  createOrder() {
    return { orderId: '01BX5ZZKBKACTAV9WEVGEMMVRZ' };
  }
  @Get('/:id')
  getOrderDetails() {
    return {
      orderId: '01BX5ZZKBKACTAV9WEVGEMMVRZ',
      //orderStatus: 'In progress',
      orderStatus: 'Review',
      //orderStatus: 'Shipping',
      providerId: '01BX5ZZKBKACTAV9WEVGEMMVRZ',
      providerName: 'Jason',
      item: 'This',
      primaryImage:
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fqiita.com%2Fs_taro%2Fitems%2F0c16f077d843ac1a78fa&psig=AOvVaw0EBMFuL7vh5q5BRZFdBNGL&ust=1702995232277000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNCLlOiVmYMDFQAAAAAdAAAAABAD',
      quantity: '1',
      price: 9999,
      estimatedProcessTime: 14,
      createdAt: +new Date('2023-12-13 11:24'),
      updatedAt: +new Date('2023-12-13 11:24'),
      requestId: '01BX5ZZKBKACTAV9WEVGEMMVRZ',
      locationName: 'Japan',
      createdBy: 'JasonLi',
      images: [],
      itemDetail: { Color: 'Red', Size: 'XS' },
      url: 'https://google.com',
      requestRemark: 'Thanks',
      offerPrice: 1000,
      categoryName: 'Clothes',
      address: 'Main St 123',
      shippingOrderNo: '123456789',
      logisticCompanyName: 'FedEx',
      logisticCompanyUrl: 'https://fedex.com',
    };
  }
}
