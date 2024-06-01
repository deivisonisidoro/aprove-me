import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { CreateAssignorDTO } from '../src/domain/dtos/assignor/CreateAssignorDTO';
import { RefreshTokenDTO } from '../src/domain/dtos/auth/RefreshTokenDTO';
import { PrismaService } from '../src/infra/database/prisma.service';
import { AppModule } from '../src/infra/modules/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let refreshToken: RefreshTokenDTO;
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

  beforeEach(async () => {
    await request(app.getHttpServer()).post('/assignor').send(assignorData);
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        login: assignorData.login,
        password: assignorData.password,
      });

    refreshToken = loginResponse.body.refreshToken;
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/POST login', () => {
    it('should sign in an assignor', async () => {
      const result = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          login: assignorData.login,
          password: assignorData.password,
        });

      expect(result.status).toBe(HttpStatus.OK);
      expect(result.body).toHaveProperty('refreshToken');
    });

    it('should not be able to sign in an assignor with invalid credentials', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          login: 'test',
          password: 'test',
        });

      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    });
  });

  describe('/POST refresh-token', () => {
    it('should refresh the token successfully', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/refresh-token')
        .send({
          refreshTokenId: refreshToken.id,
        });

      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body).toHaveProperty('token');
    });

    it('should fail to refresh the token with an invalid refresh token', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/refresh-token')
        .send({
          refreshTokenId: 'invalid-refresh-token',
        });

      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    });
  });
});
