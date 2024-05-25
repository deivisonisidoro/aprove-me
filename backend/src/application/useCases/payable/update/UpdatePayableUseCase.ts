import { ReadPayableDTO } from '../../../../domain/dtos/payable/ReadPayableDTO';
import { UpdatePayableDTO } from '../../../../domain/dtos/payable/UpdatePayableDTO';
import { Either } from '../../../../domain/either/either';
import { Left } from '../../../../domain/either/Left';
import { Right } from '../../../../domain/either/Right';
import { PayableEntityFactory } from '../../../../domain/entities/payable/PayableEntityFactory';
import { PayableValidationMessages } from '../../../../domain/enums/payable/PayableValidationMessageEnum';
import { ValidationError } from '../../../../domain/errors/ValidationErros';
import { PayableRepositoryAbstract } from '../../../../domain/repositories/PayableRepositoryAbstract';
import { UpdatePayableUseCaseAbstract } from '../../../../domain/useCases/payable/UpdatePayableUseCase';

/**
 * Concrete implementation of the UpdatePayableUseCaseAbstract class.
 * Handles the use case of updating an Payable.
 */
export class UpdatePayableUseCase extends UpdatePayableUseCaseAbstract {
  private payableRepository: PayableRepositoryAbstract;

  /**
   * Updates an instance of UpdatePayableUseCase.
   * @param {PayableRepositoryAbstract} payableRepository - The repository for Payable entities.
   */
  constructor(payableRepository: PayableRepositoryAbstract) {
    super();
    this.payableRepository = payableRepository;
  }

  /**
   * Executes the use case to update an Payable.
   * @param {string} payableId - The unique identifier of the Payable to be updated.
   * @param {UpdatePayableDTO} updatePayableDTO - The DTO containing the updated Payable data.
   * @returns {Promise<Either<ValidationError, ReadPayableDTO>>} A promise that resolves to either a validation error or the updated Payable DTO.
   */
  async execute(
    payableId: string,
    updatePayableDTO: UpdatePayableDTO,
  ): Promise<Either<ValidationError, ReadPayableDTO>> {
    const payableEntity = await this.payableRepository.findById(payableId);

    if (!payableEntity) {
      return new Left(
        new ValidationError(PayableValidationMessages.PAYABLE_NOT_FOUND),
      );
    }

    const updatedPayable = PayableEntityFactory.updatePayableEntity(
      payableEntity,
      updatePayableDTO.value,
      updatePayableDTO.emissionDate,
      updatePayableDTO.assignorId,
      undefined
    );
    if (updatedPayable.isLeft()) {
      return updatedPayable;
    }
    const savedPayable = await this.payableRepository.update(
      payableId,
      updatedPayable.value,
    );

    return new Right(savedPayable);
  }
}
