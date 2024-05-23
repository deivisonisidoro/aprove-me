import { CreateAssignorDTO } from "../../dtos/assignor/CreateAssignorDTO";
import { ReadAssignorDTO } from "../../dtos/assignor/ReadAssignorDTO";
import { Either } from "src/domain/either/either";
import { ValidationError } from "src/domain/errors/ValidationErros";


/**
 * Abstract class representing the use case for creating an assignor.
 */
export abstract class CreateAssignorUseCaseAbstract  {
  /**
   * Executes the use case to create an assignor.
   *
   * @param {CreateAssignorDTO} createAssignorDTO - The data transfer object containing the details for the new assignor.
   * @returns {Promise<Either<ValidationError, AssignorEntity>>} A promise that resolves to either a ValidationError or the created AssignorEntity.
   */
  abstract execute(createAssignorDTO: CreateAssignorDTO): Promise<Either<ValidationError, ReadAssignorDTO>>;
}
