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
}
