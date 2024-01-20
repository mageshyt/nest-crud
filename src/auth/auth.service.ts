import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async singIn(dto: AuthDto) {
    try {
      // generate the password
      const password = await argon.hash(dto.password);
      console.log({ password });

      //  save the user in the db
      const res = await this.prisma.user.create({
        data: {
          email: dto.email,
          password,
          name: dto.name,
        },
        select: {
          id: true,
          email: true,
          name: true,
          bookmarks: true,
        },
      });

      // return the saved user
      return {
        user: res,
        message: 'Login Function',
      };
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new ForbiddenException('This email is already in use');
        }
      }
      throw err;
    }
  }
  async singUp() {
    try {
      // find the user in the db
      //  if user not exist throw error
      //  if user exist compare the password
      //  if password not match throw error
      //  if password match return the user
    } catch (error) {}
  }
}
