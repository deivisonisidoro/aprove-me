import { INestApplication, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { CreateAssignorDTO } from '../src/domain/dtos/assignor/CreateAssignorDTO';
import { CreatePayableDTO } from '../src/domain/dtos/payable/CreatePayableDTO';
import { UpdatePayableDTO } from '../src/domain/dtos/payable/UpdatePayableDTO';
import { AppModule } from '../src/infra/modules/app.module';

describe('PayableController (e2e)', () => {
  let app: INestApplication;
  let createAssignorResponse: any;
  let createPayableResponse: any;

  const createAssignorDto: CreateAssignorDTO = {
    document: '13333536389',
    email: 'PayableControllerTest@example.com',
    name: 'PayableControllerTest Name',
    phone: '1234567890',
    login: 'PayableControllerTestlogin',
    password: 'Payable@Password1',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    createAssignorResponse = await request(app.getHttpServer())
      .post('/assignor')
      .send(createAssignorDto);
    const dto: CreatePayableDTO = {
      value: 1000,
      emissionDate: new Date(),
      assignorId: createAssignorResponse.body.id,
    };
    createPayableResponse = await request(app.getHttpServer())
      .post('/payables')
      .send(dto);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/POST payables', () => {
    it('should return 201 and the created payable', async () => {
      const createPayableDto: CreatePayableDTO = {
        value: 1000,
        emissionDate: new Date(),
        assignorId: createAssignorResponse.body.id,
      };

      const response = await request(app.getHttpServer())
        .post('/payables')
        .send(createPayableDto)
        .expect(HttpStatus.CREATED);

      expect(response.body).toHaveProperty('id');
    });

    it('should return 422 if required fields are missing', async () => {
      const createPayableDto = {};

      await request(app.getHttpServer())
        .post('/payables')
        .send(createPayableDto)
        .expect(HttpStatus.UNPROCESSABLE_ENTITY);
    });

    it('should return 400 if creation fails', async () => {
      const createPayableDto: CreatePayableDTO = {
        value: -1000,
        emissionDate: new Date(),
        assignorId: 'some-assignor-id',
      };

      await request(app.getHttpServer())
        .post('/payables')
        .send(createPayableDto)
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('/GET payables/:id', () => {
    it('should return 200 and the found payable', async () => {
      const payableId = createPayableResponse.body.id;

      const response = await request(app.getHttpServer())
        .get(`/payables/${payableId}`)
        .expect(HttpStatus.OK);

      expect(response.body).toHaveProperty('id');
      expect(response.body.id).toEqual(payableId);
    });

    it('should return 404 if payable is not found', async () => {
      await request(app.getHttpServer())
        .get('/payables/nonexistent-id')
        .expect(HttpStatus.NOT_FOUND);
    });
  });

  describe('/PUT payables/:id', () => {
    it('should return 200 and the updated payable', async () => {
      const payableId = createPayableResponse.body.id;

      const updatePayableDto: UpdatePayableDTO = {
        value: 2000,
        emissionDate: new Date(),
      };

      const response = await request(app.getHttpServer())
        .put(`/payables/${payableId}`)
        .send(updatePayableDto)
        .expect(HttpStatus.OK);

      expect(response.body).toHaveProperty('id');
    });

    it('should return 422 if no fields are provided for update', async () => {
      await request(app.getHttpServer())
        .put('/payables/1')
        .send({})
        .expect(HttpStatus.UNPROCESSABLE_ENTITY);
    });

    it('should return 400 if update fails', async () => {
      const payableId = createPayableResponse.body.id;

      const updatePayableDto: UpdatePayableDTO = {
        value: 2000,
        emissionDate: new Date(),
        assignorId: 'some-other-assignor-id',
      };

      await request(app.getHttpServer())
        .put(`/payables/${payableId}`)
        .send(updatePayableDto)
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('/DELETE payables/:id', () => {
    it('should return 204 if payable is deleted successfully', async () => {
      const payableId = createPayableResponse.body.id;

      await request(app.getHttpServer())
        .delete(`/payables/${payableId}`)
        .expect(HttpStatus.NO_CONTENT);
    });

    it('should return 404 if payable is not found', async () => {
      await request(app.getHttpServer())
        .delete('/payables/nonexistent-id')
        .expect(HttpStatus.NOT_FOUND);
    });
  });
});
