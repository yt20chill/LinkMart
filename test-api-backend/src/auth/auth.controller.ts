import { Controller, Post } from '@nestjs/common';

@Controller()
export class AuthController {
  @Post('signup')
  signup() {
    return { jwt: '1' };
  }
  @Post('login')
  login() {
    return { jwt: '1' };
  }
}
