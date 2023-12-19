import { Controller, Delete, Get, Post } from '@nestjs/common';

@Controller('api')
export class ApiController {
  @Get('user')
  getUser() {
    return { username: 'Jason', providerId: '01BX5ZZKBKACTAV9WEVGEMMVRZ' };
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

  @Post('logisticCompany')
  addCompany() {
    return { logisticCompanyId: 3 };
  }
}
