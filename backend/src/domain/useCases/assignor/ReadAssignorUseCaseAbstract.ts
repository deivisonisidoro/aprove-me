import { ReadAssignorDTO } from '../../dtos/assignor/ReadAssignorDTO';
import { Either } from '../../either/either';
import { ValidationError } from '../../errors/ValidationErros';

/**
 * Abstract class for the use case of reading assignors.
 */
export abstract class ReadAssignorUseCaseAbstract {
  /**
   * Executes the use case to read an assignor.
   * @param {string} assignorId - The unique identifier of the assignor to be read.
   * @returns {Promise<Either<ValidationError, ReadAssignorDTO>>} A promise that resolves to either a validation error or the read assignor DTO.
   */
  abstract execute(
    assignorId: string,
  ): Promise<Either<ValidationError, ReadAssignorDTO>>;
}
