import { Injectable } from '@nestjs/common';

import { ReadPayableDTO } from '../../../domain/dtos/payable/ReadPayableDTO';
import { PayableEntity } from '../../../domain/entities/payable/PayableEntity';

@Injectable()
export class PayableMapper {
  /**
   * Converts a PayableEntity to a ReadPayableDTO.
   *
   * @param {PayableEntity} entity - The payable entity to convert.
   * @returns {ReadPayableDTO} The converted ReadPayableDTO.
   */
  toDTO(entity: PayableEntity): ReadPayableDTO | undefined {
    if (entity) {
      const dto = new ReadPayableDTO(
        entity.id,
        entity.value,
        entity.emissionDate,
        entity.assignorId,
      );
      return dto;
    }
  }

  /**
   * Converts a ReadPayableDTO to a PayableEntity.
   *
   * @param {ReadPayableDTO} dto - The payable DTO to convert.
   * @returns {PayableEntity} The converted PayableEntity.
   */
  toEntity(dto: any): PayableEntity | undefined {
    if (dto !== null) {
      const entity = new PayableEntity(
        dto.value,
        dto.emissionDate,
        dto.assignorId,
        dto.id,
      );
      return entity;
    }

    return null;
  }
}
