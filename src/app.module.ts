import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserService } from './user/user.service';

@Module({
  imports: [AuthModule, BookmarkModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
