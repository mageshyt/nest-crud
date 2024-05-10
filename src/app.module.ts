import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserService } from './user/user.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    ScheduleModule.forRoot(),
    UserModule,
    AuthModule,
    BookmarkModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
