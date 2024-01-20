import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { UserService } from '@/user/user.service';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private user: UserService,
  ) {}
  async singUp(dto: AuthDto) {
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
        message: 'Created Successfully',
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
  async singIn(dto: AuthDto) {
    try {
      // find the user in the db
      const user = await this.user.getUserByEmail(dto.email);

      //  if user not exist throw error
      if (!user) {
        throw new ForbiddenException('Email or password is incorrect');
      }
      //  if user exist compare the password
      const isMatch = await argon.verify(user.password, dto.password);

      //  if password not match throw error
      if (!isMatch) {
        throw new ForbiddenException('Email or password is incorrect');
      }
      //  if password match return the user
      delete user.password;
      return {
        user,
        message: 'Login Function',
      };
    } catch (error) {
      throw error;
    }
  }
}
