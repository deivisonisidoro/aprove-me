/**
 * Enum for validation messages.
 * 
 * @enum {string}
 */
export enum ValidationMessages {
  /** Error message for invalid UUID format. */
  INVALID_UUID = "Invalid UUID format.",

  /** Error message when document length exceeds 30 characters. */
  DOCUMENT_TOO_LONG = "Document must be 30 characters or less.",

  /** Error message when email length exceeds 140 characters. */
  EMAIL_TOO_LONG = "Email must be 140 characters or less.",

  /** Error message for invalid email format. */
  INVALID_EMAIL_FORMAT = "Email must be in a valid format.",

  /** Error message when name length exceeds 140 characters. */
  NAME_TOO_LONG = "Name must be 140 characters or less.",

  /** Error message when phone length exceeds 20 characters. */
  PHONE_TOO_LONG = "Phone must be 20 characters or less."
}
