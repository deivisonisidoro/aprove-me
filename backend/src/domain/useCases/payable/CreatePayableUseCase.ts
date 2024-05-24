import { Either } from '../../either/either';
import { ValidationError } from '../../errors/ValidationErros';

import { CreatePayableDTO } from '../../dtos/payable/CreatePayableDTO';
import { ReadPayableDTO } from '../../dtos/payable/ReadPayableDTO';

/**
 * Abstract class representing the use case for creating an Payable.
 */
export abstract class CreatePayableUseCaseAbstract {
  /**
   * Executes the use case to create an Payable.
   *
   * @param {CreatePayableDTO} createPayableDTO - The data transfer object containing the details for the new Payable.
   * @returns {Promise<Either<ValidationError, PayableEntity>>} A promise that resolves to either a ValidationError or the created PayableEntity.
   */
  abstract execute(
    createPayableDTO: CreatePayableDTO,
  ): Promise<Either<ValidationError, ReadPayableDTO>>;
}
