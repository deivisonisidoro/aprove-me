import { ReadAssignorDTO } from '../dtos/assignor/ReadAssignorDTO';
import { AssignorEntity } from '../entities/assignor/AssignorEntity';

/**
 * Abstract class representing the repository for Assignor entities.
 */
export abstract class AssignorRepositoryAbstract {
  /**
   * Saves an assignor entity to the repository.
   *
   * @param {AssignorEntity} assignor - The assignor entity to save.
   * @returns {Promise<Either<ValidationError, AssignorEntity>>} A promise that resolves to either a ValidationError or the saved AssignorEntity.
   */
  abstract create(assignor: AssignorEntity): Promise<ReadAssignorDTO>;

  /**
   * Finds an assignor entity by its ID.
   *
   * @param {string} id - The ID of the assignor to find.
   * @returns {Promise<Either<ValidationError, AssignorEntity>>} A promise that resolves to either a ValidationError or the found AssignorEntity.
   */
  abstract findById(id: string): Promise<AssignorEntity | undefined>;

  /**
   * Updates an assignor entity in the repository.
   * @param {string} id - The ID of the assignor to update.
   * @param {AssignorEntity} assignor - The assignor entity to update.
   * @returns {Promise<Either<ValidationError, AssignorEntity>>} A promise that resolves to either a ValidationError or the updated AssignorEntity.
   */
  abstract update(
    id: string,
    assignor: AssignorEntity,
  ): Promise<ReadAssignorDTO>;

  /**
   * Deletes an assignor entity by its ID.
   *
   * @param {string} id - The ID of the assignor to delete.
   * @returns {Promise<Either<ValidationError, void>>} A promise that resolves to either a ValidationError or void if successful.
   */
  abstract deleteById(id: string): Promise<void>;
}
