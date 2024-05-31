import { Test, TestingModule } from '@nestjs/testing';

import { ReadAssignorDTO } from '../../../domain/dtos/assignor/ReadAssignorDTO';
import { AssignorEntity } from '../../../domain/entities/assignor/AssignorEntity';
import { AssignorRepositoryAbstract } from '../../../domain/repositories/AssignorRepositoryAbstract';
import { PrismaService } from '../../../infra/database/prisma.service';
import { AssignorMapper } from '../../../infra/mappers/assignor/AssignorMapper';
import { AssignorRepository } from './AssignorRepository';

describe('AssignorRepository', () => {
  let repository: AssignorRepositoryAbstract;
  let prismaService: PrismaService;
  let assignorMapper: AssignorMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssignorRepository,
        {
          provide: PrismaService,
          useValue: {
            assignor: {
              create: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
        {
          provide: AssignorMapper,
          useValue: {
            toAssignorEntity: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<AssignorRepository>(AssignorRepository);
    prismaService = module.get<PrismaService>(PrismaService);
    assignorMapper = module.get<AssignorMapper>(AssignorMapper);
  });

  describe('create', () => {
    it('should create a new assignor entity', async () => {
      const assignorEntity: AssignorEntity = new AssignorEntity(
        '123e4567-e89b-12d3-a456-426614174000',
        '1234567890',
        'test@example.com',
        'John Doe',
        '1234567890',
        'validLogin',
        'Valid1@Password',
      );
      const readAssignorDTO: ReadAssignorDTO = {
        name: 'Test Name',
        email: 'test@example.com',
        phone: '1234567890',
        login: 'testlogin',
        document: '123456789',
      };

      (prismaService.assignor.create as jest.Mock).mockResolvedValue(
        readAssignorDTO,
      );

      const result = await repository.create(assignorEntity);

      expect(prismaService.assignor.create).toHaveBeenCalledWith({
        data: {
          id: assignorEntity.id,
          name: assignorEntity.name,
          email: assignorEntity.email,
          document: assignorEntity.document,
          phone: assignorEntity.phone,
          login: assignorEntity.login,
          password: assignorEntity.password,
        },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          login: true,
          password: false,
          document: true,
        },
      });
      expect(result).toEqual(readAssignorDTO);
    });
  });

  describe('findById', () => {
    it('should return an assignor entity if found', async () => {
      const id = 'some-id';
      const assignor = {
        id,
        name: 'Test Name',
        email: 'test@example.com',
        document: '123456789',
        phone: '1234567890',
        login: 'testlogin',
        password: 'password',
      };

      (prismaService.assignor.findUnique as jest.Mock).mockResolvedValue(
        assignor,
      );
      (assignorMapper.toAssignorEntity as jest.Mock).mockReturnValue(assignor);

      const result = await repository.findById(id);

      expect(prismaService.assignor.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
      expect(assignorMapper.toAssignorEntity).toHaveBeenCalledWith(assignor);
      expect(result).toEqual(assignor);
    });

    it('should return undefined if assignor not found', async () => {
      const id = 'some-id';

      (prismaService.assignor.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await repository.findById(id);

      expect(prismaService.assignor.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toBeUndefined();
    });
  });

  describe('findByLogin', () => {
    it('should return an assignor entity if found', async () => {
      const login = 'testlogin';
      const assignor = {
        i: 'some-id',
        name: 'Test Name',
        email: 'test@example.com',
        document: '123456789',
        phone: '1234567890',
        login,
        password: 'password',
      };

      (prismaService.assignor.findUnique as jest.Mock).mockResolvedValue(
        assignor,
      );
      (assignorMapper.toAssignorEntity as jest.Mock).mockReturnValue(assignor);

      const result = await repository.findByLogin(assignor.login);

      expect(prismaService.assignor.findUnique).toHaveBeenCalledWith({
        where: { login },
      });
      expect(assignorMapper.toAssignorEntity).toHaveBeenCalledWith(assignor);
      expect(result).toEqual(assignor);
    });

    it('should return undefined if assignor not found', async () => {
      const login = 'testlogin';

      (prismaService.assignor.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await repository.findByLogin(login);

      expect(prismaService.assignor.findUnique).toHaveBeenCalledWith({
        where: { login },
      });
      expect(result).toBeUndefined();
    });
  });

  describe('update', () => {
    it('should update an existing assignor entity', async () => {
      const id = 'some-id';
      const assignorEntity: AssignorEntity = new AssignorEntity(
        '123e4567-e89b-12d3-a456-426614174000',
        '1234567890',
        'test@example.com',
        'John Doe',
        '1234567890',
        'validLogin',
        'Valid1@Password',
      );
      const readAssignorDTO: ReadAssignorDTO = {
        name: 'Updated Name',
        email: 'updated@example.com',
        phone: '0987654321',
        login: 'updatedlogin',
        document: '987654321',
      };

      (prismaService.assignor.update as jest.Mock).mockResolvedValue(
        readAssignorDTO,
      );

      const result = await repository.update(id, assignorEntity);

      expect(prismaService.assignor.update).toHaveBeenCalledWith({
        where: { id },
        data: {
          name: assignorEntity.name,
          email: assignorEntity.email,
          phone: assignorEntity.phone,
          login: assignorEntity.login,
          password: assignorEntity.password,
          document: assignorEntity.document,
        },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          login: true,
          password: false,
          document: true,
        },
      });
      expect(result).toEqual(readAssignorDTO);
    });
  });

  describe('deleteById', () => {
    it('should delete an assignor entity by its ID', async () => {
      const id = 'some-id';

      await repository.deleteById(id);

      expect(prismaService.assignor.delete).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });
});
