import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly appService: UserController) {}

  @Get()
  getHello(): string {
    return 'hello bro how are you';
  }
}
