import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { Test } from '@nestjs/testing';
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum';
import { AuthDto } from '@/auth/dto';
import { CreateBookmarkDto } from '@/bookmark/dto/create-bookmark.dto';

describe('App E2E', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );

    await app.init();
    await app.listen(3333);
    prisma = app.get<PrismaService>(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:3333');
  });

  afterAll(async () => {
    if (app) await app.close();
  });

  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'demo@demo.com',
      password: 'Demo@123',
      name: 'demo',
    };
    // signup
    describe('Signup', () => {
      it('should throw 400 for weak password', async () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            email: 'demo@demo.com',
            password: 'demo',
            name: 'demo',
          })
          .expectStatus(400)
          .toss();
      });

      it('should signup', async () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201)
          .toss();
      });
    });
    // login
    describe('signIn', () => {
      it('should throw 400 for invalid credentials', async () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            email: 'demo@demo.com',
            password: 'demo',
            name: 'demo',
          })
          .expectStatus(400);
      });

      it('should login', async () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAt', 'token');
      });
    });
    describe('User', () => {
      describe('getMe', () => {
        it('should get current user', async () => {
          return pactum
            .spec()
            .get('/users/me')
            .withHeaders({
              Authorization: 'Bearer $S{userAt}',
            })
            .expectStatus(200);
        });
      });
      describe('updateMe', () => {
        it.todo('should Update me');
      });
    });
    describe('Bookmarks', () => {
      const dto: CreateBookmarkDto = {
        description: 'testing bookmark',
        link: 'https://www.google.com',
        title: 'google',
      };
      describe('getBookmarks All bookmarks', () => {
        it('should get bookmarks', () => {
          return pactum
            .spec()
            .get('/bookmark/all')
            .withHeaders({ Authorization: 'Bearer $S{userAt}' })
            .expectStatus(200);
        });
      });
      describe('getBookmarks by ID', () => {
        it('should get bookmarks', () => {
          return pactum
            .spec()
            .get('/bookmark/1')
            .withHeaders({ Authorization: 'Bearer $S{userAt}' })
            .expectStatus(200);
        });
      });

      describe('createBookmark', () => {
        it('should create bookmark', () => {
          return pactum
            .spec()
            .post('/bookmark')
            .withHeaders({
              Authorization: 'Bearer $S{userAt}',
            })
            .withBody(dto)
            .expectStatus(201)
            .stores('bookmarkId', 'id');
        });
        describe('updateBookmark', () => {
          it('should not update bookmark Without Login', () => {
            return pactum
              .spec()
              .patch('/bookmark/1')
              .withHeaders({})
              .withBody({
                title: 'nest-js Pipes docs-1',
                link: 'https://docs.nestjs.com/pipes',
                description: 'this is nest js Pipes docs',
              })
              .expectStatus(401);
          });

          it('should  update bookmark ', () => {
            return pactum
              .spec()
              .patch('/bookmark/$S{bookmarkId}')
              .withHeaders({
                Authorization: 'Bearer $S{userAt}',
              })
              .withBody({
                title: 'nest-js Pipes docs-1',
                link: 'https://docs.nestjs.com/pipes',
                description: 'this is nest js Pipes docs',
              })
              .expectStatus(200)
              .inspect();
          });
        });

        describe('deleteBookmark', () => {});
      });
    });
  });
});
