import { ReadAssignorDTO } from "src/domain/dtos/ReadAssignorDTO";
import { Either } from "src/domain/either/either";
import { ValidationError } from "src/domain/errors/ValidationErros";


/**
 * Abstract class for the use case of reading assignors.
 */
export abstract class ReadAssignorUseCaseAbstract {
  /**
   * Executes the use case to read an assignor.
   * @param {string} assignorId - The unique identifier of the assignor to be read.
   * @returns {Promise<Either<ValidationError, ReadAssignorDTO>>} A promise that resolves to either a validation error or the read assignor DTO.
   */
  abstract execute(assignorId: string): Promise<Either<ValidationError, ReadAssignorDTO>>;
}
