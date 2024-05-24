import { ReadAssignorDTO } from "../../../../domain/dtos/assignor/ReadAssignorDTO";
import { UpdateAssignorDTO } from "../../../../domain/dtos/assignor/UpdateAssignorDTO";
import { Left } from "../../../../domain/either/Left";
import { Right } from "../../../../domain/either/Right";
import { Either } from "../../../../domain/either/either";
import { AssignorEntityFactory } from "../../../../domain/entities/assignor/AssignorEntityFactory";
import { AssignorValidationMessages } from "../../../../domain/enums/assignor/AssignorValidationMessageEnum";
import { ValidationError } from "../../../../domain/errors/ValidationErros";
import { AssignorRepositoryAbstract } from "../../../../domain/repositories/AssignorRepositoryAbstract";
import { UpdateAssignorUseCaseAbstract } from "../../../../domain/useCases/UpdateUseCaseAbstract";

/**
 * Concrete implementation of the UpdateAssignorUseCaseAbstract class.
 * Handles the use case of updating an assignor.
 */
export class UpdateAssignorUseCase extends UpdateAssignorUseCaseAbstract {
  private assignorRepository: AssignorRepositoryAbstract;

  /**
   * Creates an instance of UpdateAssignorUseCase.
   * @param {AssignorRepositoryAbstract} assignorRepository - The repository for assignor entities.
   */
  constructor(assignorRepository: AssignorRepositoryAbstract) {
    super();
    this.assignorRepository = assignorRepository;
  }

  /**
   * Executes the use case to update an assignor.
   * @param {string} assignorId - The unique identifier of the assignor to be updated.
   * @param {UpdateAssignorDTO} updateAssignorDTO - The DTO containing the updated assignor data.
   * @returns {Promise<Either<ValidationError, ReadAssignorDTO>>} A promise that resolves to either a validation error or the updated assignor DTO.
   */
  async execute(
    assignorId: string,
    updateAssignorDTO: UpdateAssignorDTO
  ): Promise<Either<ValidationError, ReadAssignorDTO>> {
    const assignorEntity = await this.assignorRepository.findById(assignorId);

    if (!assignorEntity) {
      return new Left(new ValidationError(AssignorValidationMessages.ASSIGNOR_NOT_FOUND));
    }

    const updatedAssignor = AssignorEntityFactory.updateAssignorEntity(
      assignorEntity,
      updateAssignorDTO.document,
      updateAssignorDTO.email,
      updateAssignorDTO.name,
      updateAssignorDTO.phone,
      updateAssignorDTO.login,
      updateAssignorDTO.password,
    );
    if(updatedAssignor.isLeft()){
      return updatedAssignor
    }
    const savedAssignor = await this.assignorRepository.update(assignorId, updatedAssignor.value);

    return new Right(savedAssignor);
  }
}
