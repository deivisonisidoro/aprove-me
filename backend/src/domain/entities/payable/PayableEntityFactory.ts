import { Either } from '../../either/either';
import { Left } from '../../either/Left';
import { Right } from '../../either/Right';
import { ValidationError } from '../../errors/ValidationErros';
import { PayableEntity } from './PayableEntity';

/**
 * Factory class for creating instances of PayableEntity.
 */
export class PayableEntityFactory {
  /**
   * Creates a PayableEntity instance.
   * @param {number} value - The value of the receivable.
   * @param {Date} emissionDate - The emission date of the receivable.
   * @param {string} assignorId - The assignor associated with the receivable.
   * @param {string} [id] - The optional id of the receivable.
   * @returns {Either<ValidationError, PayableEntity>} Either containing ValidationError if validation fails, or PayableEntity instance if successful.
   */
  public static createPayableEntity(
    value: number,
    emissionDate: Date,
    assignorId: string,
    id?: string,
  ): Either<ValidationError, PayableEntity> {
    const receivable = new PayableEntity(value, emissionDate, assignorId, id);

    const idValidation = receivable.setId(id);
    if (idValidation.isLeft()) {
      return new Left(idValidation.value);
    }

    const assignorIdValidation = receivable.setAssignorId(assignorId);
    if (assignorIdValidation.isLeft()) {
      return new Left(assignorIdValidation.value);
    }

    return new Right(receivable);
  }
}
