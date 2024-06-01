import { INestApplication, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { CreateAssignorDTO } from '../src/domain/dtos/assignor/CreateAssignorDTO';
import { UpdateAssignorDTO } from '../src/domain/dtos/assignor/UpdateAssignorDTO';
import { AppModule } from '../src/infra/modules/app.module';

describe('AssignorController (e2e)', () => {
  let app: INestApplication;
  let createResponse: any;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {
    const dto: CreateAssignorDTO = {
      document: '123456789',
      email: 'AssignorControllerTest@example.com',
      name: 'AssignorControllerTest Name',
      phone: '1234567890',
      login: 'AssignorControllerTestlogin',
      password: 'test@Password1',
    };

    createResponse = await request(app.getHttpServer())
      .post('/assignor')
      .send(dto);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/POST assignor', () => {
    it('should return 201 and the created assignor', async () => {
      const createAssignorDto: CreateAssignorDTO = {
        document: '12341536344',
        email: 'test@example.com',
        name: 'Test Name',
        phone: '1234567890',
        login: 'testlogin',
        password: 'test@Password1',
      };

      const response = await request(app.getHttpServer())
        .post('/assignor')
        .send(createAssignorDto);

      expect(response.status).toBe(HttpStatus.CREATED);
      expect(response.body).toHaveProperty('id');
      expect(response.body.document).toEqual(createAssignorDto.document);
      expect(response.body.email).toEqual(createAssignorDto.email);
    });

    it('should return 422 if required fields are missing', async () => {
      const createAssignorDto = {};

      await request(app.getHttpServer())
        .post('/assignor')
        .send(createAssignorDto)
        .expect(HttpStatus.UNPROCESSABLE_ENTITY);
    });

    it('should return 400 if creation fails', async () => {
      const createAssignorDto: CreateAssignorDTO = {
        document: 'invalid',
        email: 'invalid-example.com',
        name: 'Test Name',
        phone: '1234567890',
        login: 'testlogin',
        password: 'invalid-password',
      };

      await request(app.getHttpServer())
        .post('/assignor')
        .send(createAssignorDto)
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('/GET assignor/:id', () => {
    it('should return 200 and the found assignor', async () => {
      const assignorId = createResponse.body.id;

      const response = await request(app.getHttpServer())
        .get(`/assignor/${assignorId}`)
        .expect(HttpStatus.OK);

      expect(response.body).toHaveProperty('id');
      expect(response.body.id).toEqual(assignorId);
    });

    it('should return 404 if assignor is not found', async () => {
      await request(app.getHttpServer())
        .get('/assignor/nonexistent-id')
        .expect(HttpStatus.NOT_FOUND);
    });
  });

  describe('/PUT assignor/:id', () => {
    it('should return 200 and the updated assignor', async () => {
      const assignorId = createResponse.body.id;

      const updateAssignorDto: UpdateAssignorDTO = {
        document: '987654321',
        email: 'updated@example.com',
        name: 'Updated Name',
        phone: '0987654321',
        login: 'updatedlogin',
        password: 'updated@Password1',
      };

      const response = await request(app.getHttpServer())
        .put(`/assignor/${assignorId}`)
        .send(updateAssignorDto)
        .expect(HttpStatus.OK);

      expect(response.body).toHaveProperty('id');
      expect(response.body.document).toEqual(updateAssignorDto.document);
    });

    it('should return 422 if no fields are provided for update', async () => {
      await request(app.getHttpServer())
        .put('/assignor/1')
        .send({})
        .expect(HttpStatus.UNPROCESSABLE_ENTITY);
    });

    it('should return 400 if update fails', async () => {
      const assignorId = createResponse.body.id;

      const updateAssignorDto: UpdateAssignorDTO = {
        document: 'invalid',
        email: 'updated@example.com',
        name: 'Updated Name',
        phone: '0987654321',
        login: 'updatedlogin',
        password: 'updatedpassword',
      };

      await request(app.getHttpServer())
        .put(`/assignor/${assignorId}`)
        .send(updateAssignorDto)
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('/DELETE assignor/:id', () => {
    it('should return 204 if assignor is deleted successfully', async () => {
      const assignorId = createResponse.body.id;
      const response = await request(app.getHttpServer()).delete(
        `/assignor/${assignorId}`,
      );

      expect(response.status).toBe(HttpStatus.NO_CONTENT);
    });

    it('should return 404 if assignor is not found', async () => {
      await request(app.getHttpServer())
        .delete('/assignor/nonexistent-id')
        .expect(HttpStatus.NOT_FOUND);
    });
  });
});
