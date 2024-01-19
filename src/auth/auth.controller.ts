import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}
  @Post('/signin')
  singIn() {
    return {
      message: 'I am signing In',
      success: true,
    };
  }
}
