import { PayableValidationMessages } from '../../enums/payable/PayableValidationMessageEnum';
import { PayableEntity } from './PayableEntity';

describe('PayableEntity', () => {
  describe('constructor', () => {
    it('should create a PayableEntity instance with valid parameters', () => {
      const payable = new PayableEntity(
        100,
        new Date(),
        '123e4567-e89b-12d3-a456-426614174000',
      );
      expect(payable).toBeInstanceOf(PayableEntity);
    });

    it('should create a PayableEntity instance with an optional id', () => {
      const payable = new PayableEntity(
        100,
        new Date(),
        '123e4567-e89b-12d3-a456-426614174000',
        '98765432-ABCD-ABCD-ABCD-ABCDEF012345',
      );
      expect(payable).toBeInstanceOf(PayableEntity);
    });
  });

  describe('getters and setters', () => {
    let payable: PayableEntity;

    beforeEach(() => {
      payable = new PayableEntity(
        100,
        new Date(),
        '123e4567-e89b-12d3-a456-426614174000',
        '98765432-ABCD-ABCD-ABCD-ABCDEF012345',
      );
    });

    it('should get the id', () => {
      expect(payable.id).toBe('98765432-ABCD-ABCD-ABCD-ABCDEF012345');
    });

    it('should set the id', () => {
      const result = payable.setId('123e4567-e89b-12d3-a456-426614174000');
      expect(result.isLeft()).toBe(false);
      expect(payable.id).toBe('123e4567-e89b-12d3-a456-426614174000');
    });

    it('should return a Left with ValidationError if the id is not a valid UUID', () => {
      const result = payable.setId('invalid-id');
      expect(result.isLeft()).toBe(true);
      if (result.isLeft()) {
        expect(result.value.message).toBe(
          PayableValidationMessages.INVALID_UUID,
        );
      }
    });

    it('should allow setting the id to undefined', () => {
      const result = payable.setId(undefined);
      expect(result.isLeft()).toBe(false);
      expect(payable.id).toBeUndefined();
    });

    it('should return a Left with ValidationError if the id is not a valid UUID when setting it to a non-undefined value', () => {
      const result = payable.setId('invalid-id');
      expect(result.isLeft()).toBe(true);
      if (result.isLeft()) {
        expect(result.value.message).toBe(
          PayableValidationMessages.INVALID_UUID,
        );
      }
    });

    it('should get the value', () => {
      expect(payable.value).toBe(100);
    });

    it('should set the value', () => {
      payable.value = 200;
      expect(payable.value).toBe(200);
    });

    it('should get the emission date', () => {
      expect(payable.emissionDate).toBeInstanceOf(Date);
    });

    it('should set the emission date', () => {
      const newDate = new Date();
      payable.emissionDate = newDate;
      expect(payable.emissionDate).toBe(newDate);
    });

    it('should get the assignor', () => {
      expect(payable.assignorId).toBe('123e4567-e89b-12d3-a456-426614174000');
    });

    it('should set the assignorId', () => {
      const result = payable.setAssignorId(
        '123e4567-e89b-12d3-a456-426614174000',
      );
      expect(result.isLeft()).toBe(false);
      expect(payable.assignorId).toBe('123e4567-e89b-12d3-a456-426614174000');
    });
    it('should return a Left with ValidationError if the assignorId is not a valid UUID', () => {
      const result = payable.setAssignorId('invalid-id');
      expect(result.isLeft()).toBe(true);
      if (result.isLeft()) {
        expect(result.value.message).toBe(
          PayableValidationMessages.INVALID_UUID,
        );
      }
    });
  });
});
