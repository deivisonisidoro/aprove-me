/**
 * Class representing a validation error.
 * @extends Error
 */
export class ValidationError extends Error {
  /**
   * Creates an instance of ValidationError.
   * @param {string} message - The error message.
   */
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}
