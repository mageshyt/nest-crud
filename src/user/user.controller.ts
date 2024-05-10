import { GetUser } from '@/auth/decorators';
import { JwtGuard } from '@/guards';
import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { UserInterceptor } from './Interceptors/use.Interceptor';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  @ApiBearerAuth()
  @UseInterceptors(UserInterceptor)
  @Get('me')
  getProfile(@GetUser() user: User) {
    return user;
  }
}
