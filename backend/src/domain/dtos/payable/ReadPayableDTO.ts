export class ReadPayableDTO {
  id: string;
  value: number;
  emissionDate: Date;
  assignorId: string;

  /**
   * Creates a ReadPayableDTO instance.
   * @param {string | undefined} id - The unique identifier for the payable.
   * @param {number} value - The value of the payable.
   * @param {Date} emissionDate - The emission date of the payable.
   * @param {string} assignorId - The id of the payable.
   */
  constructor(
    id: string | undefined,
    value: number,
    emissionDate: Date,
    assignorId: string,
  ) {
    this.id = id;
    this.value = value;
    this.emissionDate = emissionDate;
    this.assignorId = assignorId;
  }
}
