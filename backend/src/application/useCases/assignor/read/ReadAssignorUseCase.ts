import { ReadAssignorDTO } from '../../../../domain/dtos/assignor/ReadAssignorDTO';
import { Either } from '../../../../domain/either/either';
import { Left } from '../../../../domain/either/Left';
import { Right } from '../../../../domain/either/Right';
import { ValidationMessages } from '../../../../domain/enums/assignor/ValidationMessageEnum';
import { ValidationError } from '../../../../domain/errors/ValidationErros';
import { AssignorRepositoryAbstract } from '../../../../domain/repositories/AssignorRepositoryAbstract';
import { ReadAssignorUseCaseAbstract } from '../../../../domain/useCases/read/ReadAssignorUseCaseAbstract';

/**
 * Concrete implementation of the `ReadAssignorUseCase` abstract class.
 * Handles the use case of reading an assignor.
 */
export class ReadAssignorUseCase extends ReadAssignorUseCaseAbstract {
  private assignorRepository: AssignorRepositoryAbstract;

  /**
   * Creates an instance of `ReadAssignorUseCaseImpl`.
   * @param {AssignorRepositoryAbstract} assignorRepository - The repository for assignor entities.
   */
  constructor(assignorRepository: AssignorRepositoryAbstract) {
    super();
    this.assignorRepository = assignorRepository;
  }

  /**
   * Executes the use case to read an assignor.
   * @param {string} assignorId - The unique identifier of the assignor to be read.
   * @returns {Promise<Either<ValidationError, ReadAssignorDTO>>} A promise that resolves to either a validation error or the read assignor DTO.
   */
  async execute(
    assignorId: string,
  ): Promise<Either<ValidationError, ReadAssignorDTO>> {
    const assignor = await this.assignorRepository.findById(assignorId);
    if (!assignor) {
      return new Left(
        new ValidationError(ValidationMessages.ASSIGNOR_NOT_FOUND),
      );
    }
    return new Right(assignor);
  }
}
