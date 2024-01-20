import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { AuthDto } from '../auth/dto';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}
  @HttpCode(200)
  @Post('/signin')
  signIn(@Body() dto: AuthDto) {
    return this.auth.singIn(dto);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/signup')
  signUp(@Body() dto: AuthDto) {
    return this.auth.singUp(dto);
  }
}
