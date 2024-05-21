import { ValidationError } from "../../errors/ValidationErros";

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
   * @param {string} id - The unique identifier for the assignor.
   * @param {string} document - The document number of the assignor.
   * @param {string} email - The email address of the assignor.
   * @param {string} name - The name of the assignor.
   * @param {string} phone - The phone number of the assignor.
   */
  constructor(id: string | undefined, document: string, email: string, name: string, phone: string) {
    this.id = id;
    this.document = document;
    this.email = email;
    this.name = name;
    this.phone = phone;
  }

  /**
   * Gets the id of the assignor.
   * @returns {string | undefined} The id of the assignor.
   */
  public get id(): string | undefined {
    return this._id;
  }

  /**
   * Sets the id of the assignor.
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
   * Gets the document number of the assignor.
   * @returns {string} The document number of the assignor.
   */
  public get document(): string {
    return this._document;
  }

  /**
   * Sets the document number of the assignor.
   * @param {string} document - The new document number of the assignor.
   * @throws {ValidationError} If the document exceeds 30 characters.
   */
  public set document(document: string) {
    if (document.length > 30) {
      throw new ValidationError("Document must be 30 characters or less.");
    }
    this._document = document;
  }

  /**
   * Gets the email address of the assignor.
   * @returns {string} The email address of the assignor.
   */
  public get email(): string {
    return this._email;
  }

  /**
   * Sets the email address of the assignor.
   * @param {string} email - The new email address of the assignor.
   * @throws {ValidationError} If the email exceeds 140 characters or is not a valid email format.
   */
  public set email(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.length > 140 || !emailRegex.test(email)) {
      throw new ValidationError("Email must be 140 characters or less and in a valid format.");
    }
    this._email = email;
  }

  /**
   * Gets the name of the assignor.
   * @returns {string} The name of the assignor.
   */
  public get name(): string {
    return this._name;
  }

  /**
   * Sets the name of the assignor.
   * @param {string} name - The new name of the assignor.
   * @throws {Error} If the name exceeds 140 characters.
   */
  public set name(name: string) {
    if (name.length > 140) {
      throw new Error("Name must be 140 characters or less.");
    }
    this._name = name;
  }

  /**
   * Gets the phone number of the assignor.
   * @returns {string} The phone number of the assignor.
   */
  public get phone(): string {
    return this._phone;
  }

  /**
   * Sets the phone number of the assignor.
   * @param {string} phone - The new phone number of the assignor.
   * @throws {Error} If the phone number exceeds 20 characters.
   */
  public set phone(phone: string) {
    if (phone.length > 20) {
      throw new Error("Phone must be 20 characters or less.");
    }
    this._phone = phone;
  }
}
