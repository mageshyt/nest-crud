import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ForbiddenException, Injectable } from '@nestjs/common';

import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from '@/prisma/prisma.service';

import { UserService } from '@/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private user: UserService,
    private jwt: JwtService,
    private config: ConfigService,
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
      return {
        success: "You're logged in successfully",
        user,
        token: await this.singToken(user.id, user.email, 'user'),
      };
    } catch (error) {
      throw error;
    }
  }

  singToken(userId: number, email: string, role: string) {
    const payload = { sub: userId, email, role };
    const secret = this.config.get('JWT_SECRET');

    return this.jwt.signAsync(payload, {
      secret: secret,
      expiresIn: '15m',
    });
  }
}
