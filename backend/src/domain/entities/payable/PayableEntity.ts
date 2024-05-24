import { Either } from '../../either/either';
import { Left } from '../../either/Left';
import { Right } from '../../either/Right';
import { PayableValidationMessages } from '../../enums/payable/PayableValidationMessageEnum';
import { ValidationError } from '../../errors/ValidationErros';

/**
 * Class representing a receivable entity.
 */
export class PayableEntity {
  private _id?: string;
  private _value: number;
  private _emissionDate: Date;
  private _assignorId: string;

  /**
   * Creates a PayableEntity instance.
   * @param {number} value - The value of the receivable.
   * @param {Date} emissionDate - The emission date of the receivable.
   * @param {string} assignorId - The assignorId associated with the receivable.
   * @param {string} [id] - The optional id of the receivable.
   */
  constructor(
    value: number,
    emissionDate: Date,
    assignorId: string,
    id?: string,
  ) {
    this._id = id;
    this._value = value;
    this._emissionDate = emissionDate;
    this._assignorId = assignorId;
  }

  /**
   * Gets the id of the receivable.
   * @returns {string | undefined} The id of the receivable.
   */
  public get id(): string | undefined {
    return this._id;
  }

  /**
   * Sets the id of the receivable.
   * @param {string | undefined} id - The new id of the assignorId.
   * @returns {Either<ValidationError, void>} Either a ValidationError or void.
   */
  public setId(id: string | undefined): Either<ValidationError, void> {
    if (id) {
      const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(id)) {
        return new Left(
          new ValidationError(PayableValidationMessages.INVALID_UUID),
        );
      }
    }
    this._id = id;
    return new Right(undefined);
  }

  /**
   * Gets the value of the receivable.
   * @returns {number} The value of the receivable.
   */
  public get value(): number {
    return this._value;
  }

  /**
   * Sets the value of the receivable.
   * @param {number} value - The new value of the receivable.
   */
  public set value(value: number) {
    this._value = value;
  }

  /**
   * Gets the emission date of the receivable.
   * @returns {Date} The emission date of the receivable.
   */
  public get emissionDate(): Date {
    return this._emissionDate;
  }

  /**
   * Sets the emission date of the receivable.
   * @param {Date} emissionDate - The new emission date of the receivable.
   */
  public set emissionDate(emissionDate: Date) {
    this._emissionDate = emissionDate;
  }

  /**
   * Gets the assignorId associated with the receivable.
   * @returns {string} The assignorId associated with the receivable.
   */
  public get assignorId(): string {
    return this._assignorId;
  }

  /**
   * Sets the assignorId associated with the receivable.
   * @param {string} assignorId - The new assignorId associated with the receivable.
   */
  public setAssignorId(assignorId: string): Either<ValidationError, void> {
    if (assignorId) {
      const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(assignorId)) {
        return new Left(
          new ValidationError(PayableValidationMessages.INVALID_UUID),
        );
      }
    }
    this._assignorId = assignorId;
    return new Right(undefined);
  }
}
