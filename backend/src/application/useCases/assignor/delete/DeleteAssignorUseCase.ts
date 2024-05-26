import { Injectable } from '@nestjs/common';

import { Either } from '../../../../domain/either/either';
import { Left } from '../../../../domain/either/Left';
import { Right } from '../../../../domain/either/Right';
import { AssignorValidationMessages } from '../../../../domain/enums/assignor/AssignorValidationMessageEnum';
import { AssignorSuccessMessage } from '../../../../domain/enums/assignor/AssingorSuccessMessages';
import { ValidationError } from '../../../../domain/errors/ValidationErros';
import { AssignorRepositoryAbstract } from '../../../../domain/repositories/AssignorRepositoryAbstract';
import { DeleteAssignorUseCaseAbstract } from '../../../../domain/useCases/assignor/DeleteAssignorUseCaseAbstract';

/**
 * Concrete implementation of the `DeleteAssignorUseCase` abstract class.
 * Handles the use case of deleting an assignor.
 */
@Injectable()
export class DeleteAssignorUseCase extends DeleteAssignorUseCaseAbstract {
  private assignorRepository: AssignorRepositoryAbstract;

  /**
   * Creates an instance of `DeleteAssignorUseCase`.
   * @param {AssignorRepositoryAbstract} assignorRepository - The repository for assignor entities.
   */
  constructor(assignorRepository: AssignorRepositoryAbstract) {
    super();
    this.assignorRepository = assignorRepository;
  }

  /**
   * Executes the use case to delete an assignor.
   * @param {string} assignorId - The unique identifier of the assignor to be deleted.
   * @returns {Promise<Either<ValidationError, string>>} A promise that resolves to either a validation error or a success message.
   */
  async execute(assignorId: string): Promise<Either<ValidationError, string>> {
    const assignor = await this.assignorRepository.findById(assignorId);
    if (!assignor) {
      return new Left(
        new ValidationError(AssignorValidationMessages.ASSIGNOR_NOT_FOUND),
      );
    }
    await this.assignorRepository.deleteById(assignorId);

    return new Right(AssignorSuccessMessage.DELETED_SUCCESSFULLY);
  }
}
