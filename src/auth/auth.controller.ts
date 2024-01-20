import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';
import { AuthDto } from '@/auth/dto';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}
  @Post('/signin')
  signIn(@Body() dto: AuthDto) {
    return this.auth.singIn(dto);
  }

  @Post('/signup')
  signUp() {
    return this.auth.singUp();
  }
}
