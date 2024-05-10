import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(private prisma: PrismaService) {}
  getHello(): string {
    return 'Hello World!';
  }
  @Cron(CronExpression.EVERY_10_MINUTES)
  async handleCron() {
    const bookmarks = await this.prisma.bookMark.findMany({});
    // loop through the bookmarks and check if the current time is greater than the expiry time
    for (let i = 0; i < bookmarks.length; i++) {
      const bookmark = bookmarks[i];
      if (bookmark.link) {
        // remove which dont have https
        // this.logger.debug('bookmark.link', bookmark.link.);
        if (!bookmark.link.includes('https://')) {
          this.logger.debug('Deleting', bookmark.link);
          await this.prisma.bookMark.delete({
            where: {
              id: bookmark.id,
            },
          });
        }
      }
    }
    this.logger.debug('Called when the current second is 5');
  }
}
