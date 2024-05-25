import { UpdatePayableDTO } from '../../../../domain/dtos/payable/UpdatePayableDTO';
import { Left } from '../../../../domain/either/Left';
import { Right } from '../../../../domain/either/Right';
import { PayableEntity } from '../../../../domain/entities/payable/PayableEntity';
import { PayableEntityFactory } from '../../../../domain/entities/payable/PayableEntityFactory';
import { PayableValidationMessages } from '../../../../domain/enums/payable/PayableValidationMessageEnum';
import { ValidationError } from '../../../../domain/errors/ValidationErros';
import { PayableRepositoryAbstract } from '../../../../domain/repositories/PayableRepositoryAbstract';
import { UpdatePayableUseCase } from './UpdatePayableUseCase';

describe('UpdatePayableUseCase', () => {
  let updatePayableUseCase: UpdatePayableUseCase;
  let payableRepository: jest.Mocked<PayableRepositoryAbstract>;

  beforeEach(() => {
    payableRepository = {
      findById: jest.fn(),
      update: jest.fn(),
    } as unknown as jest.Mocked<PayableRepositoryAbstract>;

    updatePayableUseCase = new UpdatePayableUseCase(payableRepository);
  });

  it('should return validation error if payable entity is not found', async () => {
    payableRepository.findById.mockResolvedValue(null);

    const payableId = 'non-existent-id';
    const updatePayableDTO: UpdatePayableDTO = {
      value: 100,
      emissionDate: new Date(),
      assignorId: 'assignor-id',
    };

    const result = await updatePayableUseCase.execute(
      payableId,
      updatePayableDTO,
    );

    expect(result).toBeInstanceOf(Left);
    expect(result.value).toBeInstanceOf(ValidationError);
    if (result.isLeft()) {
      expect(result.value.message).toBe(
        PayableValidationMessages.PAYABLE_NOT_FOUND,
      );
    }
  });

  it('should update payable entity successfully', async () => {
    const existingPayableEntity = new PayableEntity(
      120,
      new Date(),
      '123e4567-e89b-12d3-a456-426614174000',
      '123e4567-e89b-12d3-a456-426614174000',
    );
    const updatedPayableEntity = new PayableEntity(
      100,
      new Date(),
      '123e4567-e89b-12d3-a456-426614174000',
      '123e4567-e89b-12d3-a456-426614174000',
    );

    payableRepository.findById.mockResolvedValue(existingPayableEntity);
    payableRepository.update.mockResolvedValue(updatedPayableEntity);
    jest
      .spyOn(PayableEntityFactory, 'updatePayableEntity')
      .mockReturnValue(new Right(updatedPayableEntity));

    const payableId = 'existing-id';
    const updatePayableDTO: UpdatePayableDTO = {
      value: 100,
      emissionDate: new Date(),
      assignorId: 'assignor-id',
    };

    const result = await updatePayableUseCase.execute(
      payableId,
      updatePayableDTO,
    );

    expect(result).toBeInstanceOf(Right);
    expect(result.value).toEqual(updatedPayableEntity);
    expect(payableRepository.findById).toHaveBeenCalledWith(payableId);
    expect(payableRepository.update).toHaveBeenCalledWith(
      payableId,
      updatedPayableEntity,
    );
  });

  it('should return validation error during update', async () => {
    const existingPayableEntity = { id: 'existing-id' } as PayableEntity;
    const validationError = new ValidationError('Some validation error');

    payableRepository.findById.mockResolvedValue(existingPayableEntity);
    jest
      .spyOn(PayableEntityFactory, 'updatePayableEntity')
      .mockReturnValue(new Left(validationError));

    const payableId = 'existing-id';
    const updatePayableDTO: UpdatePayableDTO = {
      value: 100,
      emissionDate: new Date(),
      assignorId: 'assignor-id',
    };

    const result = await updatePayableUseCase.execute(
      payableId,
      updatePayableDTO,
    );

    expect(result).toBeInstanceOf(Left);
    expect(result.value).toBeInstanceOf(ValidationError);
    expect(payableRepository.findById).toHaveBeenCalledWith(payableId);
    expect(payableRepository.update).not.toHaveBeenCalled();
    if (result.isLeft()) {
      expect(result.value.message).toBe('Some validation error');
    }
  });
});
