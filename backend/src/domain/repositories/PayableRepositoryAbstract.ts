import { ReadPayableDTO } from '../dtos/payable/ReadPayableDTO';
import { PayableEntity } from '../entities/payable/PayableEntity';

/**
 * Abstract class representing the repository for Payable entities.
 */
export abstract class PayableRepositoryAbstract {
  /**
   * Saves an payable entity to the repository.
   *
   * @param {PayableEntity} payable - The payable entity to save.
   * @returns {Promise<Either<ValidationError, PayableEntity>>} A promise that resolves to either a ValidationError or the saved PayableEntity.
   */
  abstract create(payable: PayableEntity): Promise<ReadPayableDTO>;

  /**
   * Finds an payable entity by its ID.
   *
   * @param {string} id - The ID of the payable to find.
   * @returns {Promise<Either<ValidationError, PayableEntity>>} A promise that resolves to either a ValidationError or the found PayableEntity.
   */
  abstract findById(id: string): Promise<PayableEntity | undefined>;

  /**
   * Updates an Payable entity in the repository.
   * @param {string} id - The ID of the Payable to update.
   * @param {PayableEntity} payable - The Payable entity to update.
   * @returns {Promise<Either<ValidationError, PayableEntity>>} A promise that resolves to either a ValidationError or the updated PayableEntity.
   */
  abstract update(id: string, payable: PayableEntity): Promise<ReadPayableDTO>;

  /**
   * Deletes an Payable entity by its ID.
   *
   * @param {string} id - The ID of the Payable to delete.
   * @returns {Promise<Either<ValidationError, void>>} A promise that resolves to either a ValidationError or void if successful.
   */
  abstract deleteById(id: string): Promise<void>;
}
