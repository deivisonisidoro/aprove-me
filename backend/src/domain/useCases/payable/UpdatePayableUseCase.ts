import { ReadPayableDTO } from '../../dtos/payable/ReadPayableDTO';
import { UpdatePayableDTO } from '../../dtos/payable/UpdatePayableDTO';
import { Either } from '../../either/either';
import { ValidationError } from '../../errors/ValidationErros';

/**
 * Abstract class representing the use case for updating an Payable.
 */
export abstract class UpdatePayableUseCaseAbstract {
  /**
   * Executes the use case to update a Payable.
   * @param {string} payableId - The unique identifier of the Payable to be updated.
   * @param {UpdatePayableDTO} updatePayableDTO - The DTO containing the updated Payable data.
   * @returns {Promise<Either<ValidationError, ReadPayableDTO>>} A promise that resolves to either a validation error or the updated Payable DTO.
   */
  abstract execute(
    payableId: string,
    updatePayableDTO: UpdatePayableDTO,
  ): Promise<Either<ValidationError, ReadPayableDTO>>;
}
