import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';
import { GetUser } from '@/auth/decorators';
import { JwtGuard } from '@/guards';

@Controller('bookmark')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}
  @UseGuards(JwtGuard)
  @Post('')
  async create(
    @Body() createBookmarkDto: CreateBookmarkDto,
    @GetUser('id') userId: number,
  ) {
    console.log({ createBookmarkDto, userId });
    return await this.bookmarkService.create(createBookmarkDto, userId);
  }

  @Get('all')
  findAll() {
    return this.bookmarkService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookmarkService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBookmarkDto: UpdateBookmarkDto,
    @GetUser('id') userId: number,
  ) {
    return this.bookmarkService.update(+id, updateBookmarkDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookmarkService.remove(+id);
  }
}
