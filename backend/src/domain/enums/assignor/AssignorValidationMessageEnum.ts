/**
 * Enum for validation messages.
 *
 * @enum {string}
 */
export enum AssignorValidationMessages {
  /** Error message for invalid UUID format. */
  INVALID_UUID = 'Invalid UUID format.',

  /** Error message when document length exceeds 30 characters. */
  DOCUMENT_TOO_LONG = 'Document must be 30 characters or less.',

  /** Error message when email length exceeds 140 characters. */
  EMAIL_TOO_LONG = 'Email must be 140 characters or less.',

  /** Error message for invalid email format. */
  INVALID_EMAIL_FORMAT = 'Email must be in a valid format.',

  /** Error message when name length exceeds 140 characters. */
  NAME_TOO_LONG = 'Name must be 140 characters or less.',

  /** Error message when phone length exceeds 20 characters. */
  PHONE_TOO_LONG = 'Phone must be 20 characters or less.',

  /** Error message when login length exceeds 50 characters. */
  LOGIN_TOO_LONG = 'Login is too long.',

  /** Error message when password length is invalid. */
  PASSWORD_LENGTH_INVALID = 'Password must be between 8 and 20 characters.',

  /** Error message when password complexity is invalid. */
  PASSWORD_COMPLEXITY_INVALID = 'Password must include uppercase, lowercase, digit, and special character.',

  /** Error message when assignor not found. */
  ASSIGNOR_NOT_FOUND = 'Assignor not found.',

  /** Error message when document is required. */
  DOCUMENT_REQUIRED = 'Document is required.',

  /** Error message when document is required. */
  ID_REQUIRED = 'ID is required.',
  /** Error message when email is required. */
  EMAIL_REQUIRED = 'Email is required.',
}
