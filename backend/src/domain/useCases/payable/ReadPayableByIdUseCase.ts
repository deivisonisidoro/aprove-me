import { ReadPayableDTO } from '../../dtos/payable/ReadPayableDTO';
import { Either } from '../../either/either';
import { ValidationError } from '../../errors/ValidationErros';

/**
 * Abstract class for the use case of reading payable.
 */
export abstract class ReadPayableByIdUseCaseAbstract {
  /**
   * Executes the use case to read an payable.
   * @param {string} payableId - The unique identifier of the payable to be read.
   * @returns {Promise<Either<ValidationError, ReadPayableDTO>>} A promise that resolves to either a validation error or the read Payable DTO.
   */
  abstract execute(
    payableId: string,
  ): Promise<Either<ValidationError, ReadPayableDTO>>;
}
