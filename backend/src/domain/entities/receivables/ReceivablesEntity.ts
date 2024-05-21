import { ValidationError } from "../../errors/ValidationErros";
import { AssignorEntity } from "../assignor/AssignorEntity";

/**
 * Class representing a receivable entity.
 */
export class ReceivablesEntity {
  private _id?: string;
  private _value: number;
  private _emissionDate: Date;
  private _assignor: AssignorEntity;

  /**
   * Creates a ReceivablesEntity instance.
   * @param {number} value - The value of the receivable.
   * @param {Date} emissionDate - The emission date of the receivable.
   * @param {AssignorEntity} assignor - The assignor associated with the receivable.
   * @param {string} [id] - The optional id of the receivable.
   */
  constructor(value: number, emissionDate: Date, assignor: AssignorEntity, id?: string) {
    this._id = id;
    this._value = value;
    this._emissionDate = emissionDate;
    this._assignor = assignor;
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
   * @param {string | undefined} id - The new id of the assignor.
   * @throws {ValidationError} If the id is not a valid UUID.
   */
  public set id(id: string | undefined) {    
    if (id) {
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(id)) {
        throw new ValidationError("Invalid UUID format.");
      }
    }
    this._id = id;
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
   * Gets the assignor associated with the receivable.
   * @returns {AssignorEntity} The assignor associated with the receivable.
   */
  public get assignor(): AssignorEntity {
    return this._assignor;
  }

  /**
   * Sets the assignor associated with the receivable.
   * @param {AssignorEntity} assignor - The new assignor associated with the receivable.
   */
  public set assignor(assignor: AssignorEntity) {
    this._assignor = assignor;
  }
}
