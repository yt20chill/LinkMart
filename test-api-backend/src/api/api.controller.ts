import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class ApiController {
  @Get('user')
  getUser() {
    return { username: 'Jason', providerId: '01BX5ZZKBKACTAV9WEVGEMMVRZ' };
  }
}
