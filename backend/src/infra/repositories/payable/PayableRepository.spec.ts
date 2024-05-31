import { Test, TestingModule } from '@nestjs/testing';

import { ReadPayableDTO } from '../../../domain/dtos/payable/ReadPayableDTO';
import { PayableEntity } from '../../../domain/entities/payable/PayableEntity';
import { PrismaService } from '../../database/prisma.service';
import { PayableMapper } from '../../mappers/payable/PayableMapper';
import { PayableRepository } from './PayableRepository';

describe('PayableRepository', () => {
  let repository: PayableRepository;
  let prismaService: PrismaService;
  let payableMapper: PayableMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PayableRepository,
        {
          provide: PrismaService,
          useValue: {
            payable: {
              create: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
        {
          provide: PayableMapper,
          useValue: {
            toDTO: jest.fn(),
            toEntity: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<PayableRepository>(PayableRepository);
    prismaService = module.get<PrismaService>(PrismaService);
    payableMapper = module.get<PayableMapper>(PayableMapper);
  });

  describe('create', () => {
    it('should create a new payable and return the DTO', async () => {
      const payableEntity = new PayableEntity(
        1000,
        new Date('2024-01-01'),
        'assignorId123',
        'id123',
      );
      const payableDTO = new ReadPayableDTO(
        'id123',
        1000,
        new Date('2024-01-01'),
        'assignorId123',
      );

      (prismaService.payable.create as jest.Mock).mockResolvedValue(payableDTO);

      const result = await repository.create(payableEntity);

      expect(prismaService.payable.create).toHaveBeenCalledWith({
        data: {
          value: payableEntity.value,
          emissionDate: payableEntity.emissionDate,
          assignorId: payableEntity.assignorId,
        },
      });
      expect(result).toEqual(payableDTO);
    });
  });

  describe('findById', () => {
    it('should find a payable by ID and return the entity', async () => {
      const payableDTO = new ReadPayableDTO(
        'id123',
        1000,
        new Date('2024-01-01'),
        'assignorId123',
      );
      const payableEntity = new PayableEntity(
        1000,
        new Date('2024-01-01'),
        'assignorId123',
        'id123',
      );

      (prismaService.payable.findUnique as jest.Mock).mockResolvedValue(
        payableDTO,
      );
      (payableMapper.toEntity as jest.Mock).mockReturnValue(payableEntity);

      const result = await repository.findById('id123');

      expect(prismaService.payable.findUnique).toHaveBeenCalledWith({
        where: { id: 'id123' },
      });
      expect(result).toEqual(payableEntity);
    });
  });

  describe('update', () => {
    it('should update a payable and return the updated DTO', async () => {
      const payableEntity = new PayableEntity(
        1000,
        new Date('2024-01-01'),
        'assignorId123',
        'id123',
      );
      const payableDTO = new ReadPayableDTO(
        'id123',
        1000,
        new Date('2024-01-01'),
        'assignorId123',
      );

      (prismaService.payable.update as jest.Mock).mockResolvedValue(payableDTO);

      const result = await repository.update('id123', payableEntity);

      expect(prismaService.payable.update).toHaveBeenCalledWith({
        where: { id: 'id123' },
        data: {
          value: payableEntity.value,
          emissionDate: payableEntity.emissionDate,
          assignorId: payableEntity.assignorId,
        },
      });
      expect(result).toEqual(payableDTO);
    });
  });

  describe('deleteById', () => {
    it('should delete a payable by ID', async () => {
      (prismaService.payable.delete as jest.Mock).mockResolvedValue(undefined);

      await repository.deleteById('id123');

      expect(prismaService.payable.delete).toHaveBeenCalledWith({
        where: { id: 'id123' },
      });
    });
  });
});
