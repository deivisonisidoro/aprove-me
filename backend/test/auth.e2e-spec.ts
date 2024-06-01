import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { CreateAssignorDTO } from '../src/domain/dtos/assignor/CreateAssignorDTO';
import { PrismaService } from '../src/infra/database/prisma.service';
import { AppModule } from '../src/infra/modules/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  const assignorData: CreateAssignorDTO = {
    document: '4w42432324',
    email: 'AuthControllerTest@example.com',
    name: 'AuthControllerTest Name',
    phone: '1234567890',
    login: 'AuthControllerTestlogin',
    password: 'test@Password1',
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    prisma = module.get(PrismaService);
    await prisma.cleanDatabase();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/POST login', () => {
    it('should sign in a assignor', async () => {
      await request(app.getHttpServer()).post('/assignor').send(assignorData);
      const result = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          login: assignorData.login,
          password: assignorData.password,
        });

      expect(result.status).toBe(HttpStatus.OK);
    });

    it('should not able to sign in a assignor', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          login: 'test',
          password: 'test',
        });

      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    });
  });
});
