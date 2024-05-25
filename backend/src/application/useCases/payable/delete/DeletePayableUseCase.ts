import { Either } from '../../../../domain/either/either';
import { Left } from '../../../../domain/either/Left';
import { Right } from '../../../../domain/either/Right';
import { PayableSuccessMessage } from '../../../../domain/enums/payable/PayableSuccessMessageEnum';
import { PayableValidationMessages } from '../../../../domain/enums/payable/PayableValidationMessageEnum';
import { ValidationError } from '../../../../domain/errors/ValidationErros';
import { PayableRepositoryAbstract } from '../../../../domain/repositories/PayableRepositoryAbstract';
import { DeletePayableUseCaseAbstract } from '../../../../domain/useCases/payable/DeletePayableUseCase';

/**
 * Concrete implementation of the `DeletePayableUseCase` abstract class.
 * Handles the use case of deleting an Payable.
 */
export class DeletePayableUseCase extends DeletePayableUseCaseAbstract {
  private payableRepository: PayableRepositoryAbstract;

  /**
   * Creates an instance of `DeletePayableUseCase`.
   * @param {PayableRepositoryAbstract} payableRepository - The repository for Payable entities.
   */
  constructor(payableRepository: PayableRepositoryAbstract) {
    super();
    this.payableRepository = payableRepository;
  }

  /**
   * Executes the use case to delete an Payable.
   * @param {string} payableId - The unique identifier of the Payable to be deleted.
   * @returns {Promise<Either<ValidationError, string>>} A promise that resolves to either a validation error or a success message.
   */
  async execute(payableId: string): Promise<Either<ValidationError, string>> {
    const payable = await this.payableRepository.findById(payableId);
    if (!payable) {
      return new Left(
        new ValidationError(PayableValidationMessages.PAYABLE_NOT_FOUND),
      );
    }
    await this.payableRepository.deleteById(payableId);

    return new Right(PayableSuccessMessage.DELETED_SUCCESSFULLY);
  }
}
