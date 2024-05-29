import {
  BadRequestException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { CreatePayableDTO } from '../../../domain/dtos/payable/CreatePayableDTO';
import { ReadPayableDTO } from '../../../domain/dtos/payable/ReadPayableDTO';
import { UpdatePayableDTO } from '../../../domain/dtos/payable/UpdatePayableDTO';
import { CreatePayableUseCaseAbstract } from '../../../domain/useCases/payable/CreatePayableUseCase';
import { DeletePayableUseCaseAbstract } from '../../../domain/useCases/payable/DeletePayableUseCase';
import { ReadPayableByIdUseCaseAbstract } from '../../../domain/useCases/payable/ReadPayableByIdUseCase';
import { UpdatePayableUseCaseAbstract } from '../../../domain/useCases/payable/UpdatePayableUseCase';
import { PayableController } from './payable.controller';

describe('PayableController', () => {
  let controller: PayableController;
  let createPayableUseCase: CreatePayableUseCaseAbstract;
  let readPayableByIdUseCase: ReadPayableByIdUseCaseAbstract;
  let updatePayableUseCase: UpdatePayableUseCaseAbstract;
  let deletePayableUseCase: DeletePayableUseCaseAbstract;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayableController],
      providers: [
        {
          provide: CreatePayableUseCaseAbstract,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: ReadPayableByIdUseCaseAbstract,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: UpdatePayableUseCaseAbstract,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: DeletePayableUseCaseAbstract,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PayableController>(PayableController);
    createPayableUseCase = module.get<CreatePayableUseCaseAbstract>(
      CreatePayableUseCaseAbstract,
    );
    readPayableByIdUseCase = module.get<ReadPayableByIdUseCaseAbstract>(
      ReadPayableByIdUseCaseAbstract,
    );
    updatePayableUseCase = module.get<UpdatePayableUseCaseAbstract>(
      UpdatePayableUseCaseAbstract,
    );
    deletePayableUseCase = module.get<DeletePayableUseCaseAbstract>(
      DeletePayableUseCaseAbstract,
    );
  });

  describe('create', () => {
    it('should throw UnprocessableEntityException if required fields are missing', async () => {
      const createPayableDto: CreatePayableDTO = {
        value: null,
        emissionDate: null,
        assignorId: null,
      } as any;

      await expect(controller.create(createPayableDto)).rejects.toThrow(
        UnprocessableEntityException,
      );
    });

    it('should create a payable successfully', async () => {
      const createPayableDto: CreatePayableDTO = {
        value: 100,
        emissionDate: new Date(),
        assignorId: 'some-uuid',
      };
      const readPayableDto: ReadPayableDTO = {
        id: 'some-id',
        value: 100,
        emissionDate: new Date(),
        assignorId: 'some-uuid',
      };

      (createPayableUseCase.execute as jest.Mock).mockResolvedValue({
        isLeft: () => false,
        value: readPayableDto,
      });

      const result = await controller.create(createPayableDto);

      expect(result).toEqual(readPayableDto);
    });

    it('should throw BadRequestException if creation fails', async () => {
      const createPayableDto: CreatePayableDTO = {
        value: 100,
        emissionDate: new Date(),
        assignorId: 'some-uuid',
      };

      (createPayableUseCase.execute as jest.Mock).mockResolvedValue({
        isLeft: () => true,
        value: { message: 'error' },
      });

      await expect(controller.create(createPayableDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('findById', () => {
    it('should find a payable by ID', async () => {
      const readPayableDto: ReadPayableDTO = {
        id: 'some-id',
        value: 100,
        emissionDate: new Date(),
        assignorId: 'some-uuid',
      };

      (readPayableByIdUseCase.execute as jest.Mock).mockResolvedValue({
        isLeft: () => false,
        value: readPayableDto,
      });

      const result = await controller.findById('some-id');

      expect(result).toEqual(readPayableDto);
    });

    it('should throw NotFoundException if payable is not found', async () => {
      (readPayableByIdUseCase.execute as jest.Mock).mockResolvedValue({
        isLeft: () => true,
        value: { message: 'not found' },
      });

      await expect(controller.findById('some-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should throw UnprocessableEntityException if no fields are provided for update', async () => {
      const updatePayableDto: UpdatePayableDTO = {} as any;

      await expect(
        controller.update('some-id', updatePayableDto),
      ).rejects.toThrow(UnprocessableEntityException);
    });

    it('should update a payable successfully', async () => {
      const updatePayableDto: UpdatePayableDTO = {
        value: 200,
        emissionDate: new Date(),
        assignorId: 'some-uuid',
      };
      const readPayableDto: ReadPayableDTO = {
        id: 'some-id',
        value: 200,
        emissionDate: new Date(),
        assignorId: 'some-uuid',
      };

      (updatePayableUseCase.execute as jest.Mock).mockResolvedValue({
        isLeft: () => false,
        value: readPayableDto,
      });

      const result = await controller.update('some-id', updatePayableDto);

      expect(result).toEqual(readPayableDto);
    });

    it('should throw BadRequestException if update fails', async () => {
      const updatePayableDto: UpdatePayableDTO = {
        value: 200,
        emissionDate: new Date(),
        assignorId: 'some-uuid',
      };

      (updatePayableUseCase.execute as jest.Mock).mockResolvedValue({
        isLeft: () => true,
        value: { message: 'error' },
      });

      await expect(
        controller.update('some-id', updatePayableDto),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('deleteById', () => {
    it('should delete a payable successfully', async () => {
      (deletePayableUseCase.execute as jest.Mock).mockResolvedValue({
        isLeft: () => false,
      });

      await expect(controller.deleteById('some-id')).resolves.toBeUndefined();
    });

    it('should throw NotFoundException if payable is not found', async () => {
      (deletePayableUseCase.execute as jest.Mock).mockResolvedValue({
        isLeft: () => true,
        value: { message: 'not found' },
      });

      await expect(controller.deleteById('some-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
