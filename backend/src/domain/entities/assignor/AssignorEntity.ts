import { Left } from "../../either/Left";
import { ValidationMessages } from "../../enums/assignor/ValidationMessageEnum";
import { ValidationError } from "../../errors/ValidationErros";
import { Either } from "../../either/either";
import { Right } from "../../either/Right";

/**
 * Class representing an assignor entity.
 */
export class AssignorEntity {
  private _id?: string;
  private _document: string;
  private _email: string;
  private _name: string;
  private _phone: string;

  /**
   * Creates an AssignorEntity instance.
   *
   * @param {string | undefined} id - The unique identifier for the assignor.
   * @param {string} document - The document number of the assignor.
   * @param {string} email - The email address of the assignor.
   * @param {string} name - The name of the assignor.
   * @param {string} phone - The phone number of the assignor.
   */
  constructor(id: string | undefined, document: string, email: string, name: string, phone: string) {
    this._id = id;
    this._document = document;
    this._email = email;
    this._name = name;
    this._phone = phone;
  }

  /**
   * Gets the id of the assignor.
   *
   * @returns {string | undefined} The id of the assignor.
   */
  public get id(): string | undefined {
    return this._id;
  }

  /**
   * Sets the id of the assignor.
   *
   * @param {string | undefined} id - The new id of the assignor.
   * @returns {Either<ValidationError, void>} Either containing ValidationError if validation fails, or void if successful.
   */
  public setId(id: string | undefined): Either<ValidationError, void> {
    if (id) {
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(id)) {
        return new Left(new ValidationError(ValidationMessages.INVALID_UUID));
      }
    }
    this._id = id;
    return new Right(undefined);
  }

  /**
   * Gets the document number of the assignor.
   *
   * @returns {string} The document number of the assignor.
   */
  public get document(): string {
    return this._document;
  }

  /**
   * Sets the document number of the assignor.
   *
   * @param {string} document - The new document number of the assignor.
   * @returns {Either<ValidationError, void>} Either containing ValidationError if validation fails, or void if successful.
   */
  public setDocument(document: string): Either<ValidationError, void> {
    if (document.length > 30) {
      return new Left(new ValidationError(ValidationMessages.DOCUMENT_TOO_LONG));
    }
    this._document = document;
    return new Right(undefined);
  }

  /**
   * Gets the email address of the assignor.
   *
   * @returns {string} The email address of the assignor.
   */
  public get email(): string {
    return this._email;
  }

  /**
   * Sets the email address of the assignor.
   *
   * @param {string} email - The new email address of the assignor.
   * @returns {Either<ValidationError, void>} Either containing ValidationError if validation fails, or void if successful.
   */
  public setEmail(email: string): Either<ValidationError, void> {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.length > 140) {
      return new Left(new ValidationError(ValidationMessages.EMAIL_TOO_LONG));
    }
    if (!emailRegex.test(email)) {
      return new Left(new ValidationError(ValidationMessages.INVALID_EMAIL_FORMAT));
    }
    this._email = email;
    return new Right(undefined);
  }

  /**
   * Gets the name of the assignor.
   *
   * @returns {string} The name of the assignor.
   */
  public get name(): string {
    return this._name;
  }

  /**
   * Sets the name of the assignor.
   *
   * @param {string} name - The new name of the assignor.
   * @returns {Either<ValidationError, void>} Either containing ValidationError if validation fails, or void if successful.
   */
  public setName(name: string): Either<ValidationError, void> {
    if (name.length > 140) {
      return new Left(new ValidationError(ValidationMessages.NAME_TOO_LONG));
    }
    this._name = name;
    return new Right(undefined);
  }

  /**
   * Gets the phone number of the assignor.
   *
   * @returns {string} The phone number of the assignor.
   */
  public get phone(): string {
    return this._phone;
  }

  /**
   * Sets the phone number of the assignor.
   *
   * @param {string} phone - The new phone number of the assignor.
   * @returns {Either<ValidationError, void>} Either containing ValidationError if validation fails, or void if successful.
   */
  public setPhone(phone: string): Either<ValidationError, void> {
    if (phone.length > 20) {
      return new Left(new ValidationError(ValidationMessages.PHONE_TOO_LONG));;
    }
    this._phone = phone;
    return new Right(undefined);
  }
}