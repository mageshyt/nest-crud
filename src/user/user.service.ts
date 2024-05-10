import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  getUserById(id: number) {
    try {
      return this.prisma.user.findUnique({
        where: {
          id,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  getUserByEmail(email: string) {
    try {
      return this.prisma.user.findUnique({
        where: {
          email,
        },
      });
    } catch (err) {
      throw err;
    }
  }
}
