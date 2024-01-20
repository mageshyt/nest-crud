import { GetUser } from '..//auth/decorators';
import { JwtGuard } from '..//guards';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  @Get('me')
  getProfile(@GetUser() user: User, @GetUser('id') id: number) {
    console.log(id);
    return user;
  }
}
