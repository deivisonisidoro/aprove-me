export class CreatePayableDTO {
  value: number;
  emissionDate: Date;
  assignorId: string;

  /**
   * Creates a CreatePayableDTO instance.
   * @param {number} value - The value of the receivable.
   * @param {Date} emissionDate - The emission date of the receivable.
   * @param {string} assignorId - The id of the assignor.
   */
  constructor(value: number, emissionDate: Date, assignorId: string) {
    this.value = value;
    this.emissionDate = emissionDate;
    this.assignorId = assignorId;
  }
}
