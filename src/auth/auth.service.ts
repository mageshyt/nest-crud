import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async login() {
    console.log('Login Function');
  }
  async register() {}
}
