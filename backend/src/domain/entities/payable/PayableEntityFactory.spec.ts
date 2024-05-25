import { PayableValidationMessages } from '../../enums/payable/PayableValidationMessageEnum';
import { ValidationError } from '../../errors/ValidationErros';
import { PayableEntity } from './PayableEntity';
import { PayableEntityFactory } from './PayableEntityFactory';

describe('PayableEntityFactory', () => {
  describe('createPayableEntity', () => {
    it('should create a PayableEntity instance with valid parameters', () => {
      const result = PayableEntityFactory.createPayableEntity(
        100,
        new Date(),
        '123e4567-e89b-12d3-a456-426614174000',
      );

      expect(result.isRight()).toBe(true);
      if (result.isRight()) {
        expect(result.value).toBeInstanceOf(PayableEntity);
      }
    });

    it('should create a PayableEntity instance with an optional id', () => {
      const result = PayableEntityFactory.createPayableEntity(
        100,
        new Date(),
        '123e4567-e89b-12d3-a456-426614174000',
        '98765432-ABCD-ABCD-ABCD-ABCDEF012345',
      );

      expect(result.isRight()).toBe(true);
      if (result.isRight()) {
        expect(result.value).toBeInstanceOf(PayableEntity);
      }
    });

    it('should return a Left with ValidationError if the id is not a valid UUID', () => {
      const result = PayableEntityFactory.createPayableEntity(
        100,
        new Date(),
        '123e4567-e89b-12d3-a456-426614174000',
        'invalid-id',
      );

      expect(result.isLeft()).toBe(true);
      if (result.isLeft()) {
        expect(result.value).toBeInstanceOf(ValidationError);
        expect(result.value.message).toBe(
          PayableValidationMessages.INVALID_UUID,
        );
      }
    });
  });
  describe('updatePayableEntity', () => {
    it('should update a PayableEntity instance with valid parameters', () => {
      const payable = new PayableEntity(
        100,
        new Date(),
        '123e4567-e89b-12d3-a456-426614174000',
      );
      const updatedValue = 200;
      const updatedEmissionDate = new Date();
      const updatedAssignorId = '123e4567-e89b-12d3-a456-426614174001';
      const updatedId = '98765432-ABCD-ABCD-ABCD-ABCDEF012346';

      const result = PayableEntityFactory.updatePayableEntity(
        payable,
        updatedValue,
        updatedEmissionDate,
        updatedAssignorId,
        updatedId,
      );

      expect(result.isRight()).toBe(true);
      if (result.isRight()) {
        expect(result.value).toBeInstanceOf(PayableEntity);
        expect(result.value.value).toBe(updatedValue);
        expect(result.value.emissionDate).toBe(updatedEmissionDate);
        expect(result.value.assignorId).toBe(updatedAssignorId);
        expect(result.value.id).toBe(updatedId);
      }
    });

    it('should return a Left with ValidationError if the assignorId is invalid', () => {
      const payable = new PayableEntity(
        100,
        new Date(),
        '123e4567-e89b-12d3-a456-426614174000',
      );
      const invalidAssignorId = 'invalid-assignor-id';

      const result = PayableEntityFactory.updatePayableEntity(
        payable,
        undefined,
        undefined,
        invalidAssignorId,
      );

      expect(result.isLeft()).toBe(true);
      if (result.isLeft()) {
        expect(result.value).toBeInstanceOf(ValidationError);
        expect(result.value.message).toBe(
          PayableValidationMessages.INVALID_UUID,
        );
      }
    });

    it('should return a Left with ValidationError if the id is invalid', () => {
      const payable = new PayableEntity(
        100,
        new Date(),
        '123e4567-e89b-12d3-a456-426614174000',
      );
      const invalidId = 'invalid-id';

      const result = PayableEntityFactory.updatePayableEntity(
        payable,
        undefined,
        undefined,
        undefined,
        invalidId,
      );

      expect(result.isLeft()).toBe(true);
      if (result.isLeft()) {
        expect(result.value).toBeInstanceOf(ValidationError);
        expect(result.value.message).toBe(
          PayableValidationMessages.INVALID_UUID,
        );
      }
    });
  });
});
