import { Injectable } from '@nestjs/common';

import { AssignorEntity } from '../../../domain/entities/assignor/AssignorEntity';

/**
 * Mapper class for converting between AssignorEntity and ReadAssignorDTO.
 */
@Injectable()
export class AssignorMapper {
  /**
   * Converts a plain object to an AssignorEntity.
   *
   * @param {ReadAssignorDTO} assignor - The plain object representing the assignor.
   * @returns {AssignorEntity} The converted AssignorEntity.
   */
  toAssignorEntity(assignor: any): AssignorEntity {
    return new AssignorEntity(
      assignor.id,
      assignor.document,
      assignor.name,
      assignor.email,
      assignor.phone,
      assignor.login,
      assignor.password,
    );
  }
}
