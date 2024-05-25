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
   * @param {number} value - The value of the payable.
   * @param {Date} emissionDate - The emission date of the payable.
   * @param {string} assignorId - The assignor associated with the payable.
   * @param {string} [id] - The optional id of the payable.
   * @returns {Either<ValidationError, PayableEntity>} Either containing ValidationError if validation fails, or PayableEntity instance if successful.
   */
  public static createPayableEntity(
    value: number,
    emissionDate: Date,
    assignorId: string,
    id?: string,
  ): Either<ValidationError, PayableEntity> {
    const payable = new PayableEntity(value, emissionDate, assignorId, id);

    const idValidation = payable.setId(id);
    if (idValidation.isLeft()) {
      return new Left(idValidation.value);
    }

    const assignorIdValidation = payable.setAssignorId(assignorId);
    if (assignorIdValidation.isLeft()) {
      return new Left(assignorIdValidation.value);
    }

    return new Right(payable);
  }

  /**
   * Update a PayableEntity instance.
   * @param {PayableEntity} payable - The existing payable entity to update.
   * @param {number | undefined} value - The value of the payable.
   * @param {Date | undefined} emissionDate - The emission date of the payable.
   * @param {string | undefined} assignorId - The assignor associated with the payable.
   * @param {string | undefined} [id] - The optional id of the payable.
   * @returns {Either<ValidationError, PayableEntity>} Either containing ValidationError if validation fails, or PayableEntity instance if successful.
   */
  public static updatePayableEntity(
    payable: PayableEntity,
    value?: number,
    emissionDate?: Date,
    assignorId?: string,
    id?: string,
  ): Either<ValidationError, PayableEntity> {
    if (value) {
      payable.value = value;
    }
    if (emissionDate) {
      payable.emissionDate = emissionDate;
    }
    if (assignorId) {
      const assignorIdValidation = payable.setAssignorId(assignorId);
      if (assignorIdValidation.isLeft()) {
        return new Left(assignorIdValidation.value);
      }
    }
    if (id) {
      const idValidation = payable.setId(id);
      if (idValidation.isLeft()) {
        return new Left(idValidation.value);
      }
    }
    return new Right(payable);
  }
}
