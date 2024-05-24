import { CreateAssignorDTO } from '../../../../domain/dtos/assignor/CreateAssignorDTO';
import { ReadAssignorDTO } from '../../../../domain/dtos/assignor/ReadAssignorDTO';
import { Either } from '../../../../domain/either/either';
import { Left } from '../../../../domain/either/Left';
import { Right } from '../../../../domain/either/Right';
import { AssignorEntityFactory } from '../../../../domain/entities/assignor/AssignorEntityFactory';
import { AssignorValidationMessages } from '../../../../domain/enums/assignor/AssignorValidationMessageEnum';
import { ValidationError } from '../../../../domain/errors/ValidationErros';
import { AssignorRepositoryAbstract } from '../../../../domain/repositories/AssignorRepositoryAbstract';
import { CreateAssignorUseCaseAbstract } from '../../../../domain/useCases/assignor/CreateAssignorUseCaseAbstract ';

/**
 * Concrete implementation of the CreateAssignorUseCaseAbstract class.
 * Handles the use case of creating a new assignor.
 */
export class CreateAssignorUseCase extends CreateAssignorUseCaseAbstract {
  private assignorRepository: AssignorRepositoryAbstract;

  /**
   * Creates an instance of CreateAssignorUseCase.
   * @param {AssignorRepositoryAbstract} assignorRepository - The repository for assignor entities.
   */
  constructor(assignorRepository: AssignorRepositoryAbstract) {
    super();
    this.assignorRepository = assignorRepository;
  }

  /**
   * Executes the use case to create a new assignor.
   * @param {CreateAssignorDTO} createAssignorDTO - The data transfer object containing assignor information.
   * @returns {Promise<Either<ValidationError, ReadAssignorDTO>>} A promise that resolves to either a validation error or the created assignor DTO.
   */
  async execute(
    createAssignorDTO: CreateAssignorDTO,
  ): Promise<Either<ValidationError, ReadAssignorDTO>> {
    if (!createAssignorDTO.document) {
      return new Left(
        new ValidationError(AssignorValidationMessages.DOCUMENT_REQUIRED),
      );
    }
    if (!createAssignorDTO.email) {
      return new Left(
        new ValidationError(AssignorValidationMessages.EMAIL_REQUIRED),
      );
    }

    const newAssignor = AssignorEntityFactory.createAssignorEntity(
      undefined,
      createAssignorDTO.document,
      createAssignorDTO.email,
      createAssignorDTO.name,
      createAssignorDTO.phone,
      createAssignorDTO.login,
      createAssignorDTO.password,
    );
    if (newAssignor.isLeft()) {
      return newAssignor;
    }
    const savedAssignor = await this.assignorRepository.create(
      newAssignor.value,
    );
    return new Right(savedAssignor);
  }
}
