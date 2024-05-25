import { Left } from '../../../../domain/either/Left';
import { Right } from '../../../../domain/either/Right';
import { PayableEntity } from '../../../../domain/entities/payable/PayableEntity';
import { PayableSuccessMessage } from '../../../../domain/enums/payable/PayableSuccessMessageEnum';
import { PayableValidationMessages } from '../../../../domain/enums/payable/PayableValidationMessageEnum';
import { ValidationError } from '../../../../domain/errors/ValidationErros';
import { PayableRepositoryAbstract } from '../../../../domain/repositories/PayableRepositoryAbstract';
import { DeletePayableUseCase } from './DeletePayableUseCase';

describe('DeletePayableUseCase', () => {
  let deletePayableUseCase: DeletePayableUseCase;
  let payableRepository: jest.Mocked<PayableRepositoryAbstract>;

  beforeEach(() => {
    payableRepository = {
      findById: jest.fn(),
      deleteById: jest.fn(),
    } as unknown as jest.Mocked<PayableRepositoryAbstract>;

    deletePayableUseCase = new DeletePayableUseCase(payableRepository);
  });

  it('should return validation error if payable entity is not found', async () => {
    payableRepository.findById.mockResolvedValue(null);

    const payableId = 'non-existent-id';

    const result = await deletePayableUseCase.execute(payableId);

    expect(result).toBeInstanceOf(Left);
    expect(result.value).toBeInstanceOf(ValidationError);
    if (result.isLeft()) {
      expect(result.value.message).toBe(
        PayableValidationMessages.PAYABLE_NOT_FOUND,
      );
    }
  });

  it('should delete payable entity successfully', async () => {
    const existingPayableEntity = new PayableEntity(
      100,
      new Date(),
      '123e4567-e89b-12d3-a456-426614174000',
      '123e4567-e89b-12d3-a456-426614174000',
    );

    payableRepository.findById.mockResolvedValue(existingPayableEntity);
    payableRepository.deleteById.mockResolvedValue(null);

    const payableId = 'existing-id';

    const result = await deletePayableUseCase.execute(payableId);

    expect(result).toBeInstanceOf(Right);
    expect(result.value).toBe(PayableSuccessMessage.DELETED_SUCCESSFULLY);
    expect(payableRepository.findById).toHaveBeenCalledWith(payableId);
    expect(payableRepository.deleteById).toHaveBeenCalledWith(payableId);
  });
});
