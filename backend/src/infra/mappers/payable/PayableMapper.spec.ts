import { ReadPayableDTO } from "../../../domain/dtos/payable/ReadPayableDTO";
import { PayableEntity } from "../../../domain/entities/payable/PayableEntity";
import { PayableMapper } from "./PayableMapper";

describe('PayableMapper', () => {
  let payableMapper: PayableMapper;

  beforeEach(() => {
    payableMapper = new PayableMapper();
  });

  describe('toDTO', () => {
    it('should convert a PayableEntity to a ReadPayableDTO', () => {
      const entity = new PayableEntity(1000, new Date('2024-01-01'), 'assignorId123', '123e4567-e89b-12d3-a456-426614174000');
      const dto = payableMapper.toDTO(entity);
      
      expect(dto).toBeInstanceOf(ReadPayableDTO);
      expect(dto.id).toBe(entity.id);
      expect(dto.value).toBe(entity.value);
      expect(dto.emissionDate).toEqual(entity.emissionDate);
      expect(dto.assignorId).toBe(entity.assignorId);
    });
  });

  describe('toEntity', () => {
    it('should convert a ReadPayableDTO to a PayableEntity', () => {
      const dto = new ReadPayableDTO('id123', 1000, new Date('2024-01-01'), 'assignorId123');
      const entity = payableMapper.toEntity(dto);

      expect(entity).toBeInstanceOf(PayableEntity);
      expect(entity.id).toBe(dto.id);
      expect(entity.value).toBe(dto.value);
      expect(entity.emissionDate).toEqual(dto.emissionDate);
      expect(entity.assignorId).toBe(dto.assignorId);
    });
  });
});
