import { CreatePayableDTO } from '../../../../domain/dtos/payable/CreatePayableDTO';
import { ReadPayableDTO } from '../../../../domain/dtos/payable/ReadPayableDTO';
import { Left } from '../../../../domain/either/Left';
import { Right } from '../../../../domain/either/Right';
import { PayableEntityFactory } from '../../../../domain/entities/payable/PayableEntityFactory';
import { PayableValidationMessages } from '../../../../domain/enums/payable/PayableValidationMessageEnum';
import { ValidationError } from '../../../../domain/errors/ValidationErros';
import { PayableRepositoryAbstract } from '../../../../domain/repositories/PayableRepositoryAbstract';
import { CreatePayableUseCase } from './CretaePayableUseCase';

describe('CreatePayableUseCase', () => {
  let createPayableUseCase: CreatePayableUseCase;
  let mockPayableRepository: PayableRepositoryAbstract;

  beforeEach(() => {
    mockPayableRepository = {
      create: jest.fn(),
    } as unknown as PayableRepositoryAbstract;
    createPayableUseCase = new CreatePayableUseCase(mockPayableRepository);
  });

  it('should return an error if PayableId is missing', async () => {
    const createPayableDTO: CreatePayableDTO = {
      value: 100,
      emissionDate: new Date(),
      assignorId: null,
    };
    const result = await createPayableUseCase.execute(createPayableDTO);

    expect(result).toBeInstanceOf(Left);
    expect(result.value).toBeInstanceOf(ValidationError);
    if (result.isLeft()) {
      expect(result.value.message).toBe(
        PayableValidationMessages.ASSIGNOR_ID_MISSING,
      );
    }
  });

  it('should return Left with ValidationError when PayableEntity creation fails', async () => {
    const createPayableDTO: CreatePayableDTO = {
      value: 100,
      emissionDate: new Date(),
      assignorId: '123e4567-e89b-12d3-a456-426614174000',
    };
    jest
      .spyOn(PayableEntityFactory, 'createPayableEntity')
      .mockReturnValueOnce(
        new Left(new ValidationError('Failed to create PayableEntity')),
      );

    const result = await createPayableUseCase.execute(createPayableDTO);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ValidationError);
    if (result.isLeft()) {
      expect(result.value.message).toBe('Failed to create PayableEntity');
    }
  });

  it('should create a payable successfully', async () => {
    const validDate = new Date();
    const createPayableDTO: CreatePayableDTO = {
      value: 100,
      emissionDate: validDate,
      assignorId: '123e4567-e89b-12d3-a456-426614174000',
    };
    const readPayableDTO: ReadPayableDTO = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      value: 100,
      emissionDate: validDate,
      assignorId: '123e4567-e89b-12d3-a456-426614174000',
    };

    (mockPayableRepository.create as jest.Mock).mockResolvedValue(
      readPayableDTO,
    );
    const result = await createPayableUseCase.execute(createPayableDTO);

    expect(result).toBeInstanceOf(Right);
    expect(result.value).toBe(readPayableDTO);
  });
});
