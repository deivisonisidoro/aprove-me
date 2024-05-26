import { Injectable } from '@nestjs/common';
import { CreatePayableDTO } from '../../../../domain/dtos/payable/CreatePayableDTO';
import { ReadPayableDTO } from '../../../../domain/dtos/payable/ReadPayableDTO';
import { Either } from '../../../../domain/either/either';
import { Left } from '../../../../domain/either/Left';
import { Right } from '../../../../domain/either/Right';
import { PayableEntityFactory } from '../../../../domain/entities/payable/PayableEntityFactory';
import { PayableValidationMessages } from '../../../../domain/enums/payable/PayableValidationMessageEnum';
import { ValidationError } from '../../../../domain/errors/ValidationErros';
import { PayableRepositoryAbstract } from '../../../../domain/repositories/PayableRepositoryAbstract';
import { CreatePayableUseCaseAbstract } from '../../../../domain/useCases/payable/CreatePayableUseCase';

/**
 * Concrete implementation of the CreatePayableUseCaseAbstract class.
 * Handles the use case of creating a new Payable.
 */
@Injectable()
export class CreatePayableUseCase extends CreatePayableUseCaseAbstract {
  private payableRepository: PayableRepositoryAbstract;

  /**
   * Creates an instance of CreatePayableUseCase.
   * @param {PayableRepositoryAbstract} payableRepository - The repository for Payable entities.
   */
  constructor(payableRepository: PayableRepositoryAbstract) {
    super();
    this.payableRepository = payableRepository;
  }

  /**
   * Executes the use case to create a new Payable.
   * @param {CreatePayableDTO} createPayableDTO - The data transfer object containing Payable information.
   * @returns {Promise<Either<ValidationError, ReadPayableDTO>>} A promise that resolves to either a validation error or the created Payable DTO.
   */
  async execute(
    createPayableDTO: CreatePayableDTO,
  ): Promise<Either<ValidationError, ReadPayableDTO>> {
    if (!createPayableDTO.assignorId) {
      return new Left(
        new ValidationError(PayableValidationMessages.ASSIGNOR_ID_MISSING),
      );
    }

    const newPayable = PayableEntityFactory.createPayableEntity(
      createPayableDTO.value,
      createPayableDTO.emissionDate,
      createPayableDTO.assignorId,
      undefined,
    );
    if (newPayable.isLeft()) {
      return newPayable;
    }
    const savedPayable = await this.payableRepository.create(newPayable.value);
    return new Right(savedPayable);
  }
}
