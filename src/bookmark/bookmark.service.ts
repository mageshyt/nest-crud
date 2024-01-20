import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}
  create(createBookmarkDto: CreateBookmarkDto, userId: number) {
    return this.prisma.bookMark.create({
      data: {
        title: createBookmarkDto.title,
        link: createBookmarkDto.link,
        description: createBookmarkDto.description,
        userId: userId,
      },
    });
  }

  async findAll() {
    return await this.prisma.bookMark.findMany();
  }

  findOne(id: number) {
    return this.prisma.bookMark.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(
    id: number,
    updateBookmarkDto: UpdateBookmarkDto,
    userId: number,
  ) {
    try {
      //   check if the user is the owner of the bookmark
      const bookmark = await this.prisma.bookMark.findUnique({
        where: {
          id: id,
        },
        select: {
          userId: true,
        },
      });

      if (bookmark.userId !== userId)
        throw new ForbiddenException('You are not the owner of this bookmark');

      await this.prisma.bookMark.update({
        where: {
          id: id,
        },
        data: {
          title: updateBookmarkDto.title,
          link: updateBookmarkDto.link,
          description: updateBookmarkDto.description,
        },
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        console.log(e.code);
        throw new ForbiddenException('You are not the owner of this bookmark');
      }

      throw e;
    }
  }

  remove(id: number) {
    return this.prisma.bookMark.delete({
      where: {
        id: id,
      },
    });
  }
}
