import { ReadAssignorDTO } from '../dtos/assignor/ReadAssignorDTO';
import { UpdateAssignorDTO } from '../dtos/assignor/UpdateAssignorDTO';
import { Either } from '../either/either';
import { ValidationError } from '../errors/ValidationErros';

/**
 * Abstract class representing the use case for updating an assignor.
 */
export abstract class UpdateAssignorUseCaseAbstract {
  /**
   * Executes the use case to update an assignor.
   * @param {string} assignorId - The unique identifier of the assignor to be updated.
   * @param {UpdateAssignorDTO} updateAssignorDTO - The DTO containing the updated assignor data.
   * @returns {Promise<Either<ValidationError, ReadAssignorDTO>>} A promise that resolves to either a validation error or the updated assignor DTO.
   */
  abstract execute(
    assignorId: string,
    updateAssignorDTO: UpdateAssignorDTO,
  ): Promise<Either<ValidationError, ReadAssignorDTO>>;
}
