import { ReadPayableDTO } from '../../../domain/dtos/payable/ReadPayableDTO';
import { PayableEntity } from '../../../domain/entities/payable/PayableEntity';

export class PayableMapper {
  /**
   * Converts a PayableEntity to a ReadPayableDTO.
   *
   * @param {PayableEntity} entity - The payable entity to convert.
   * @returns {ReadPayableDTO} The converted ReadPayableDTO.
   */
  toDTO(entity: PayableEntity): ReadPayableDTO {
    const dto = new ReadPayableDTO(
      entity.id,
      entity.value,
      entity.emissionDate,
      entity.assignorId,
    );
    return dto;
  }

  /**
   * Converts a ReadPayableDTO to a PayableEntity.
   *
   * @param {ReadPayableDTO} dto - The payable DTO to convert.
   * @returns {PayableEntity} The converted PayableEntity.
   */
  toEntity(dto: ReadPayableDTO): PayableEntity {
    const entity = new PayableEntity(
      dto.value,
      dto.emissionDate,
      dto.assignorId,
      dto.id,
    );
    return entity;
  }
}
