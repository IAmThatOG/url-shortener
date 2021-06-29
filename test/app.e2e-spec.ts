import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ClientModule } from '../src/client/client.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ClientModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  test('/url/encode (POST)', () => {
    return request(app.getHttpServer())
      .post('/url/encode')
      .expect(201);
  });

  afterAll(async () => {
    await app.close();
  });
});
