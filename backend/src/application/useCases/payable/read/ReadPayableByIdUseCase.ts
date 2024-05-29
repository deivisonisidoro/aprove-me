import { Injectable } from '@nestjs/common';

import { ReadPayableDTO } from '../../../../domain/dtos/payable/ReadPayableDTO';
import { Either } from '../../../../domain/either/either';
import { Left } from '../../../../domain/either/Left';
import { Right } from '../../../../domain/either/Right';
import { PayableValidationMessages } from '../../../../domain/enums/payable/PayableValidationMessageEnum';
import { ValidationError } from '../../../../domain/errors/ValidationErros';
import { PayableRepositoryAbstract } from '../../../../domain/repositories/PayableRepositoryAbstract';
import { ReadPayableByIdUseCaseAbstract } from '../../../../domain/useCases/payable/ReadPayableByIdUseCase';

/**
 * Concrete implementation of the `ReadPayableByIdUseCase` abstract class.
 * Handles the use case of reading an Payable.
 */
@Injectable()
export class ReadPayableByIdUseCase extends ReadPayableByIdUseCaseAbstract {
  private payableRepository: PayableRepositoryAbstract;

  /**
   * Read an instance of `ReadPayableByIdUseCaseImpl`.
   * @param {payableRepository} payableRepository - The repository for Payable entities.
   */
  constructor(payableRepository: PayableRepositoryAbstract) {
    super();
    this.payableRepository = payableRepository;
  }

  /**
   * Executes the use case to read an payable.
   * @param {string} payableId - The unique identifier of the Payable to be read.
   * @returns {Promise<Either<ValidationError, ReadPayableDTO>>} A promise that resolves to either a validation error or the read Payable DTO.
   */
  async execute(
    payableId: string,
  ): Promise<Either<ValidationError, ReadPayableDTO>> {
    const payable = await this.payableRepository.findById(payableId);
    if (!payable) {
      return new Left(
        new ValidationError(PayableValidationMessages.PAYABLE_NOT_FOUND, 404),
      );
    }
    const readPayableDTO = new ReadPayableDTO(
      payable.id,
      payable.value,
      payable.emissionDate,
      payable.assignorId,
    );
    return new Right(readPayableDTO);
  }
}
