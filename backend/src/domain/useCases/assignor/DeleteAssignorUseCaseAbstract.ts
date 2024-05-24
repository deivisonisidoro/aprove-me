import { Either } from '../../either/either';
import { ValidationError } from '../../errors/ValidationErros';

/**
 * Abstract class representing the use case for updating an assignor.
 */
export abstract class DeleteAssignorUseCaseAbstract {
  /**
   * Executes the use case to delete an assignor.
   * @param {string} assignorId - The unique identifier of the assignor to be Deleted.
   * @returns {Promise<Either<ValidationError, void>>} A promise that resolves to either a validation error or the Deleted assignor DTO.
   */
  abstract execute(
    assignorId: string,
  ): Promise<Either<ValidationError, string>>;
}
