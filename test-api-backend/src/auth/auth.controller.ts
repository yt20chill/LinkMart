import { Controller, Get, Post } from '@nestjs/common';

@Controller()
export class AuthController {
  @Post('signup')
  signup() {
    return { jwt: '1' };
  }
  @Get('login')
  login() {
    return { jwt: '1' };
  }
}
