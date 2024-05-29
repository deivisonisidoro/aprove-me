import { Left } from '../../../../domain/either/Left';
import { Right } from '../../../../domain/either/Right';
import { PayableEntity } from '../../../../domain/entities/payable/PayableEntity';
import { PayableValidationMessages } from '../../../../domain/enums/payable/PayableValidationMessageEnum';
import { PayableRepositoryAbstract } from '../../../../domain/repositories/PayableRepositoryAbstract';
import { ReadPayableByIdUseCase } from './ReadPayableByIdUseCase';

describe('ReadPayableByIdUseCase', () => {
  let payableRepository: PayableRepositoryAbstract;
  let readPayableByIdUseCase: ReadPayableByIdUseCase;

  beforeEach(() => {
    payableRepository = {
      findById: jest.fn(),
    } as unknown as PayableRepositoryAbstract;
    readPayableByIdUseCase = new ReadPayableByIdUseCase(payableRepository);
  });

  it('should return a Right with ReadPayableDTO when payable is found', async () => {
    const payable = new PayableEntity(
      100,
      new Date(),
      '123e4567-e89b-12d3-a456-426614174000',
      '123e4567-e89b-12d3-a456-426614174000',
    );
    (payableRepository.findById as jest.Mock).mockResolvedValue(payable);

    const result = await readPayableByIdUseCase.execute('1');

    expect(result).toBeInstanceOf(Right);
  });

  it('should return a Left with ValidationError when payable is not found', async () => {
    (payableRepository.findById as jest.Mock).mockResolvedValue(null);

    const result = await readPayableByIdUseCase.execute('1');

    expect(result).toBeInstanceOf(Left);
    if (result.isLeft()) {
      expect(result.value.message).toEqual(
        PayableValidationMessages.PAYABLE_NOT_FOUND,
      );
    }
  });
});
