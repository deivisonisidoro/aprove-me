import {
  UnprocessableEntityException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';

import { CreateAssignorDTO } from '../../../domain/dtos/assignor/CreateAssignorDTO';
import { ReadAssignorDTO } from '../../../domain/dtos/assignor/ReadAssignorDTO';
import { UpdateAssignorDTO } from '../../../domain/dtos/assignor/UpdateAssignorDTO';
import { Either } from '../../../domain/either/either';
import { Left } from '../../../domain/either/Left';
import { Right } from '../../../domain/either/Right';
import { CreateAssignorUseCaseAbstract } from '../../../domain/useCases/assignor/CreateAssignorUseCaseAbstract ';
import { DeleteAssignorUseCaseAbstract } from '../../../domain/useCases/assignor/DeleteAssignorUseCaseAbstract';
import { ReadAssignorByIdUseCaseAbstract } from '../../../domain/useCases/assignor/ReadAssignorByIdUseCaseAbstract';
import { UpdateAssignorUseCaseAbstract } from '../../../domain/useCases/assignor/UpdateUseCaseAbstract';
import { AssignorController } from './assignor.controller';

describe('AssignorController', () => {
  let controller: AssignorController;
  let createAssignorUseCase: CreateAssignorUseCaseAbstract;
  let readAssignorByIdUseCase: ReadAssignorByIdUseCaseAbstract;
  let updateAssignorUseCase: UpdateAssignorUseCaseAbstract;
  let deleteAssignorUseCase: DeleteAssignorUseCaseAbstract;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssignorController],
      providers: [
        {
          provide: CreateAssignorUseCaseAbstract,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: ReadAssignorByIdUseCaseAbstract,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: UpdateAssignorUseCaseAbstract,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: DeleteAssignorUseCaseAbstract,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AssignorController>(AssignorController);
    createAssignorUseCase = module.get<CreateAssignorUseCaseAbstract>(
      CreateAssignorUseCaseAbstract,
    );
    readAssignorByIdUseCase = module.get<ReadAssignorByIdUseCaseAbstract>(
      ReadAssignorByIdUseCaseAbstract,
    );
    updateAssignorUseCase = module.get<UpdateAssignorUseCaseAbstract>(
      UpdateAssignorUseCaseAbstract,
    );
    deleteAssignorUseCase = module.get<DeleteAssignorUseCaseAbstract>(
      DeleteAssignorUseCaseAbstract,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new assignor', async () => {
      const dto: CreateAssignorDTO = {
        document: '123456789',
        email: 'test@example.com',
        name: 'John Doe',
        phone: '1234567890',
        login: 'testlogin',
        password: 'password',
      };

      const mockResult: Either<any, ReadAssignorDTO> = new Right({
        document: '123456789',
        email: 'test@example.com',
        name: 'John Doe',
        phone: '1234567890',
        login: 'testlogin',
      });

      (createAssignorUseCase.execute as jest.Mock).mockResolvedValue(
        mockResult,
      );

      await expect(controller.create(dto)).resolves.toEqual(mockResult.value);
    });
    it('should throw UnprocessableEntityException if required fields are missing', async () => {
      const dto: CreateAssignorDTO = {
        document: '',
        email: '',
        name: '',
        phone: '',
        login: '',
        password: '',
      };

      await expect(controller.create(dto)).rejects.toThrow(
        UnprocessableEntityException,
      );
    });
  });

  describe('findById', () => {
    it('should find an assignor by ID', async () => {
      const mockResult: Either<any, ReadAssignorDTO> = new Right({
        document: '123456789',
        email: 'test@example.com',
        name: 'John Doe',
        phone: '1234567890',
        login: 'testlogin',
      });

      (readAssignorByIdUseCase.execute as jest.Mock).mockResolvedValue(
        mockResult,
      );

      await expect(controller.findById('assignor-id')).resolves.toEqual(
        mockResult.value,
      );
    });

    it('should throw NotFoundException if assignor is not found', async () => {
      const mockResult: Either<any, ReadAssignorDTO> = new Left({
        message: 'Assignor not found.',
      });

      (readAssignorByIdUseCase.execute as jest.Mock).mockResolvedValue(
        mockResult,
      );

      await expect(controller.findById('assignor-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update an existing assignor', async () => {
      const dto: UpdateAssignorDTO = {
        document: '123456789',
        email: 'test@example.com',
        name: 'John Doe',
        phone: '1234567890',
        login: 'testlogin',
        password: 'password',
      };

      const mockResult: Either<any, ReadAssignorDTO> = new Right({
        document: '123456789',
        email: 'test@example.com',
        name: 'John Doe',
        phone: '1234567890',
        login: 'testlogin',
      });

      (updateAssignorUseCase.execute as jest.Mock).mockResolvedValue(
        mockResult,
      );

      await expect(controller.update('assignor-id', dto)).resolves.toEqual(
        mockResult.value,
      );
    });

    it('should throw UnprocessableEntityException if no fields are provided for update', async () => {
      const dto: UpdateAssignorDTO = {};

      await expect(controller.update('assignor-id', dto)).rejects.toThrow(
        UnprocessableEntityException,
      );
    });

    it('should throw BadRequestException if update fails due to validation errors', async () => {
      const dto: UpdateAssignorDTO = {
        document: '123456789',
        email: 'test@example.com',
        name: 'John Doe',
        phone: '1234567890',
        login: 'testlogin',
        password: 'password',
      };

      const mockResult: Either<any, ReadAssignorDTO> = new Left({
        message: 'Validation error.',
      });

      (updateAssignorUseCase.execute as jest.Mock).mockResolvedValue(
        mockResult,
      );

      await expect(controller.update('assignor-id', dto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('deleteById', () => {
    it('should delete an assignor by ID', async () => {
      const mockResult: Either<any, void> = new Right(undefined);

      (deleteAssignorUseCase.execute as jest.Mock).mockResolvedValue(
        mockResult,
      );

      await expect(
        controller.deleteById('assignor-id'),
      ).resolves.toBeUndefined();
    });

    it('should throw NotFoundException if assignor is not found', async () => {
      const mockResult: Either<any, void> = new Left({
        message: 'Assignor not found.',
      });

      (deleteAssignorUseCase.execute as jest.Mock).mockResolvedValue(
        mockResult,
      );

      await expect(controller.deleteById('assignor-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
