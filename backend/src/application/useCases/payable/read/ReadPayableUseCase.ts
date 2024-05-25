import { ReadPayableDTO } from '../../../../domain/dtos/payable/ReadPayableDTO';
import { Either } from '../../../../domain/either/either';
import { Left } from '../../../../domain/either/Left';
import { Right } from '../../../../domain/either/Right';
import { PayableValidationMessages } from '../../../../domain/enums/payable/PayableValidationMessageEnum';
import { ValidationError } from '../../../../domain/errors/ValidationErros';
import { PayableRepositoryAbstract } from '../../../../domain/repositories/PayableRepositoryAbstract';
import { ReadPayableUseCaseAbstract } from '../../../../domain/useCases/payable/ReadPayableUseCase';

/**
 * Concrete implementation of the `ReadPayableUseCase` abstract class.
 * Handles the use case of reading an Payable.
 */
export class ReadPayableUseCase extends ReadPayableUseCaseAbstract {
  private PayableRepository: PayableRepositoryAbstract;

  /**
   * Creates an instance of `ReadPayableUseCaseImpl`.
   * @param {PayableRepositoryAbstract} PayableRepository - The repository for Payable entities.
   */
  constructor(PayableRepository: PayableRepositoryAbstract) {
    super();
    this.PayableRepository = PayableRepository;
  }

  /**
   * Executes the use case to read an payable.
   * @param {string} PayableId - The unique identifier of the Payable to be read.
   * @returns {Promise<Either<ValidationError, ReadPayableDTO>>} A promise that resolves to either a validation error or the read Payable DTO.
   */
  async execute(
    PayableId: string,
  ): Promise<Either<ValidationError, ReadPayableDTO>> {
    const payable = await this.PayableRepository.findById(PayableId);
    if (!payable) {
      return new Left(
        new ValidationError(PayableValidationMessages.PAYABLE_NOT_FOUND, 404),
      );
    }
    const readPayableDTO = new ReadPayableDTO(
      payable.id,
      payable.value,
      payable.emissionDate,
      payable.assignorId      
    );
    return new Right(readPayableDTO);
  }
}
