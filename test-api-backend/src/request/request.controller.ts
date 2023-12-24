import { Controller, Get } from '@nestjs/common';

@Controller('request')
export class RequestController {
  @Get()
  getAllRequest() {
    return {
      totalRecords: 6,
      totalPages: 2,
      requests: [
        {
          requestId: '01BX5ZZKBKACTAV9WEVGEMMVRY',
          locationName: 'Japan',
          item: '1/48 RX-78F00 GUNDAM Full Gear with Extra Paint',
          primaryImage:
            'https://otsukai.com/public/item/69644/original-60ff12d0461f9.jpeg',
          offerPrice: 500,
          createdBy: 'Fredy',
          updatedAt: '2022-12-10 12:00',
        },
        {
          requestId: '01BX5ZZKBKACTAV9WEVGEMMVRZ',
          locationName: 'Japan',
          item: 'Sakura Figure',
          primaryImage:
            'https://lojabuscanimes.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/s/a/sakura-01.jpg',
          offerPrice: null,
          createdBy: 'Mad',
          updatedAt: '2023-11-10 12:10',
        },
        {
          requestId: '01BX5ZZKBKACTAV9WEVGEMMVS0',
          locationName: 'Japan',
          item: '真天魔限量版透明公仔',
          primaryImage:
            'https://media.karousell.com/media/photos/products/2016/05/30/online_1464614698_bb2c47e1.jpg',
          offerPrice: 250,
          createdBy: '阿莫',
          updatedAt: '2023-12-09 12:20',
        },
        {
          requestId: '01BX5ZZKBKACTAV9WEVGEMMVS1',
          locationName: 'Korea',
          item: 'Beer',
          primaryImage:
            'https://static.wixstatic.com/media/4b9e41_faeaf6eae1af40c89c33356ea259eff6~mv2.jpg/v1/fill/w_296,h_222,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/4b9e41_faeaf6eae1af40c89c33356ea259eff6~mv2.jpg',
          offerPrice: 500,
          createdBy: 'Kevin',
          updatedAt: '2023-12-04 12:00',
        },
        {
          requestId: '01BX5ZZKBKZZZZZZZZZZZZZZZX',
          locationName: 'Korea',
          item: 'MLB FUR Jacket NY YANKEES',
          primaryImage:
            'https://img.cdn.91app.hk/webapi/imagesV3/Original/SalePage/358471/0/638350418176770000?v=1',
          offerPrice: null,
          createdBy: 'Mary',
          updatedAt: '2023-12-10 23:10',
        },
        {
          requestId: '01BX5ZZKBKZZZZZZZZZZZZZZZY',
          locationName: 'Japan',
          item: 'ROG 明日香電競主機',
          primaryImage:
            'https://www.price.com.hk/space/product/nsp/images/20231005/044782eb9e34c68173ac.jpg',
          offerPrice: 25000,
          createdBy: 'JasonLi',
          updatedAt: '2023-12-11 3:59',
        },
      ],
    };
  }
  @Get('/:id')
  getRequestById() {
    return {
      requestId: '01HHEZNSZ64QBWC6J77YAWHAEY',
      locationId: 1,
      locationName: '🇯🇵 Japan',
      categoryId: 1,
      categoryName: 'Clothes',
      itemDetail: {
        Color: 'White',
        Size: 'XS',
        Width: 'White',
        Height: 'XS',
        Scale: 'White',
        Range: 'XS',
      },
      item: 'Uniqlo White Jacket',
      primaryImage:
        'http://cdn.linkmart.com.s3-website-ap-southeast-1.amazonaws.com/profiles/profile-1702383773670.avif',
      images: [
        {
          imageId: 1,
          imagePath:
            'http://cdn.linkmart.com.s3-website-ap-southeast-1.amazonaws.com/profiles/profile-1702383773670.avif',
        },
        { imageId: 2, imagePath: 'https://loremflickr.com/320/240?random=1' },
        { imageId: 3, imagePath: 'https://loremflickr.com/320/240?random=2' },
        { imageId: 4, imagePath: 'https://loremflickr.com/320/240?random=3' },
        { imageId: 5, imagePath: 'https://loremflickr.com/320/240?random=4' },
        { imageId: 6, imagePath: 'https://loremflickr.com/320/240?random=5' },
        { imageId: 7, imagePath: 'https://loremflickr.com/320/240?random=6' },
        { imageId: 8, imagePath: 'https://loremflickr.com/320/240?random=7' },
        { imageId: 9, imagePath: 'https://loremflickr.com/320/240?random=8' },
      ],
      url: 'https://google.com',
      quantity: '1',
      requestRemark: '無縫羽絨連帽外套',
      offerPrice: 1900,
      createdBy: 'Jason',
      // createdBy: 'JasonLi',
      createdAt: '2023-12-12 20:22:54.04832',
      updatedAt: '2023-12-12 20:22:54.04832',
    };
  }
}
