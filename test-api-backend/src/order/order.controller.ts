import { Controller, Get } from '@nestjs/common';

@Controller('api/order')
export class OrderController {
  @Get()
  createOrder() {
    return { orderId: '01BX5ZZKBKACTAV9WEVGEMMVRZ' };
  }
}
