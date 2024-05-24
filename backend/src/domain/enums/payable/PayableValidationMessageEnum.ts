/**
 * Enum for validation messages.
 *
 * @enum {string}
 */
export enum PayableValidationMessages {
  /** Error message for invalid UUID format. */
  INVALID_UUID = 'Invalid UUID format.',

  /** Error message for invalid value. */
  INVALID_VALUE = 'Value must be a positive number.',

  /** Error message for invalid emission date. */
  INVALID_EMISSION_DATE = 'Emission date must be a valid date.',

  /** Error message for invalid assignor entity. */
  INVALID_ASSIGNOR = 'Assignor must be a valid AssignorEntity instance.',

  /** Error message for assignor id missing. */
  ASSIGNOR_ID_MISSING = 'Assignor ID is missing.',
}
