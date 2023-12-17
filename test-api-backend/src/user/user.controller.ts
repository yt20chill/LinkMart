import { Controller, Get, Post } from '@nestjs/common';

@Controller('api/user')
export class UserController {
  @Get('address')
  findAllAddress() {
    return [
      { addressId: 1, address: 'address 1' },
      { addressId: 2, address: 'address 2' },
      { addressId: 3, address: 'address 3' },
    ];
  }
  @Post('address')
  addAddress() {
    return { message: 'address added' };
  }
  @Get('request')
  findAllRequests() {
    return [
      {
        requestId: '01BX5ZZKBKACTAV9WEVGEMMVRY',
        locationName: 'Japan',
        item: '1/48 RX-78F00 GUNDAM Full Gear with Extra Paint',
        primaryImage:
          'https://otsukai.com/public/item/69644/original-60ff12d0461f9.jpeg',
        offerPrice: 500,
        createdBy: 'Jason',
        updatedAt: '2022-12-10 12:00',
      },
      {
        requestId: '01BX5ZZKBKACTAV9WEVGEMMVRZ',
        locationName: 'Japan',
        item: 'Sakura Figure',
        primaryImage:
          'https://lojabuscanimes.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/s/a/sakura-01.jpg',
        offerPrice: null,
        createdBy: 'Jason',
        updatedAt: '2023-11-10 12:10',
      },
      {
        requestId: '01BX5ZZKBKACTAV9WEVGEMMVS0',
        locationName: 'Japan',
        item: '真天魔限量版透明公仔',
        primaryImage:
          'https://media.karousell.com/media/photos/products/2016/05/30/online_1464614698_bb2c47e1.jpg',
        offerPrice: 250,
        createdBy: 'Jason',
        updatedAt: '2023-12-09 12:20',
      },
      {
        requestId: '01BX5ZZKBKACTAV9WEVGEMMVS1',
        locationName: 'Korea',
        item: 'Beer',
        primaryImage:
          'https://static.wixstatic.com/media/4b9e41_faeaf6eae1af40c89c33356ea259eff6~mv2.jpg/v1/fill/w_296,h_222,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/4b9e41_faeaf6eae1af40c89c33356ea259eff6~mv2.jpg',
        offerPrice: 500,
        createdBy: 'Jason',
        updatedAt: '2023-12-04 12:00',
      },
      {
        requestId: '01BX5ZZKBKZZZZZZZZZZZZZZZX',
        locationName: 'Korea',
        item: 'MLB FUR Jacket NY YANKEES',
        primaryImage:
          'https://img.cdn.91app.hk/webapi/imagesV3/Original/SalePage/358471/0/638350418176770000?v=1',
        offerPrice: null,
        createdBy: 'Jason',
        updatedAt: '2023-12-10 23:10',
      },
      {
        requestId: '01BX5ZZKBKZZZZZZZZZZZZZZZY',
        locationName: 'Japan',
        item: 'ROG 明日香電競主機',
        primaryImage:
          'https://www.price.com.hk/space/product/nsp/images/20231005/044782eb9e34c68173ac.jpg',
        offerPrice: 25000,
        createdBy: 'Jason',
        updatedAt: '2023-12-11 3:59',
      },
    ];
  }
}
