import { Right } from "../../either/Right";
import { Either } from "../../either/either";
import { Left } from "../../either/Left";
import { ValidationError } from "../../errors/ValidationErros";
import { ReceivablesEntity } from "./ReceivablesEntity";
import { AssignorEntity } from "../assignor/AssignorEntity";

/**
 * Factory class for creating instances of ReceivablesEntity.
 */
export class ReceivablesEntityFactory {
  /**
   * Creates a ReceivablesEntity instance.
   * @param {number} value - The value of the receivable.
   * @param {Date} emissionDate - The emission date of the receivable.
   * @param {AssignorEntity} assignor - The assignor associated with the receivable.
   * @param {string} [id] - The optional id of the receivable.
   * @returns {Either<ValidationError, ReceivablesEntity>} Either containing ValidationError if validation fails, or ReceivablesEntity instance if successful.
   */
  public static createReceivablesEntity(value: number, emissionDate: Date, assignor: AssignorEntity, id?: string): Either<ValidationError, ReceivablesEntity> {
    const receivable = new ReceivablesEntity(value, emissionDate, assignor, id);

    const idValidation = receivable.setId(id);
    if (idValidation.isLeft()) {
      return new Left(idValidation.value);
    }

    return new Right(receivable);
  }
}
