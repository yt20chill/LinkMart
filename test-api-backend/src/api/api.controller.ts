import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('api')
export class ApiController {
  @Get('user')
  getUser() {
    // return { username: 'Jason', providerId: '01BX5ZZKBKACTAV9WEVGEMMVRZ' };
    return { username: 'Jason', providerId: null };
  }
  @Get('request')
  findAllRequests() {
    return [
      {
        item: 'i want to buy clothes',
        requestId: '01HHHJBZXAT9TGB4H0JCE9BGPV',
        createdBy: 'Potato',
        createdAt: '2023-12-13 20:28:04.664624',
        updatedAt: '2023-12-13 20:28:04.664624',
        primaryImage:
          'http://cdn.linkmart.com.s3-website-ap-southeast-1.amazonaws.com/profiles/profile-1702470483882.avif',
        offerPrice: 0,
        locationName: '1',
        imagePath:
          'http://cdn.linkmart.com.s3-website-ap-southeast-1.amazonaws.com/profiles/profile-1702528154987.jpg',
      },
      {
        item: 'clothes',
        requestId: '01HHK9BZBBR3N03R0BE0HD6H5W',
        createdBy: 'Potato',
        createdAt: '2023-12-14 12:29:18.412715',
        updatedAt: '2023-12-14 12:29:18.412715',
        primaryImage:
          'http://cdn.linkmart.com.s3-website-ap-southeast-1.amazonaws.com/profiles/profile-1702528154987.jpg',
        offerPrice: 11900,
        locationName: '1',
        imagePath:
          'http://cdn.linkmart.com.s3-website-ap-southeast-1.amazonaws.com/profiles/profile-1702470483882.avif',
      },
    ];
  }
  @Delete('request/:id')
  deleteRequest() {
    return { message: 'request deleted' };
  }
  @Post('request')
  createRequest() {
    return { requestId: '01HHHJBZXAT9TGB4H0JCE9BGPV' };
  }

  @Post('logisticCompany')
  addCompany() {
    return { logisticCompanyId: 3 };
  }

  @Post('offer')
  createOffer() {
    return { success: true };
  }
  @Put('order/:id')
  updateOrder() {
    return { success: true };
  }

  @Get('provider')
  getProvider() {
    // return { data: null };
    return {
      data: {
        verificationId: '01BX5ZZKBKACTAV9WEVGEMMVRZ',
        statusName: 'Pending',
        idDocument: 'https://loremflickr.com/320/240?random=1',
        addressDocument: 'https://loremflickr.com/320/240?random=2',
        bankDocument: 'https://loremflickr.com/320/240?random=3',
      },
    };
  }

  @Get('provider/order/:status')
  getTasks() {
    return [
      {
        orderId: '01BX5ZZKBKACTAV9WEVGEMMVRZ',
        orderStatus: 'Review',
        providerId: '01BX5ZZKBKACTAV9WEVGEMMVRZ',
        providerName: 'Jason',
        item: 'This',
        primaryImage:
          'https://www.google.com/url?sa=i&url=https%3A%2F%2Fqiita.com%2Fs_taro%2Fitems%2F0c16f077d843ac1a78fa&psig=AOvVaw0EBMFuL7vh5q5BRZFdBNGL&ust=1702995232277000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNCLlOiVmYMDFQAAAAAdAAAAABAD',
        quantity: '1',
        price: 9999,
        estimatedProcessTime: 14,
        createdAt: new Date('2023-12-13 11:24'),
      },
      {
        orderId: '01BX5ZZKBKACTBV0WEVGEMMVRZ',
        orderStatus: 'In progress',
        providerId: '01BX5ZZKBKACTAV9WEVGEMMVRZ',
        providerName: 'Jason',
        item: 'That',
        primaryImage:
          'https://www.google.com/url?sa=i&url=https%3A%2F%2Fqiita.com%2Fs_taro%2Fitems%2F0c16f077d843ac1a78fa&psig=AOvVaw0EBMFuL7vh5q5BRZFdBNGL&ust=1702995232277000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNCLlOiVmYMDFQAAAAAdAAAAABAD',
        quantity: '1',
        price: 9999,
        estimatedProcessTime: 14,
        createdAt: new Date('2023-12-20 11:24'),
      },
    ];
  }
}
