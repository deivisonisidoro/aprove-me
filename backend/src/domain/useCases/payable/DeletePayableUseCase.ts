import { Either } from '../../either/either';
import { ValidationError } from '../../errors/ValidationErros';

/**
 * Abstract class representing the use case for updating an Payable.
 */
export abstract class DeletePayableUseCaseAbstract {
  /**
   * Executes the use case to delete an payable.
   * @param {string} payableId - The unique identifier of the Payable to be Deleted.
   * @returns {Promise<Either<ValidationError, void>>} A promise that resolves to either a validation error or the Deleted Payable DTO.
   */
  abstract execute(payableId: string): Promise<Either<ValidationError, string>>;
}
