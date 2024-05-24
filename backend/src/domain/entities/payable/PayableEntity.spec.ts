import { PayableValidationMessages } from '../../enums/payable/PayableValidationMessageEnum';
import { AssignorEntity } from '../assignor/AssignorEntity';
import { PayableEntity } from './PayableEntity';

describe('PayableEntity', () => {
  describe('constructor', () => {
    it('should create a PayableEntity instance with valid parameters', () => {
      const assignor = new AssignorEntity(
        '123e4567-e89b-12d3-a456-426614174000',
        '1234567890',
        'test@example.com',
        'John Doe',
        '1234567890',
        'login',
        'password',
      );
      const receivable = new PayableEntity(100, new Date(), assignor);
      expect(receivable).toBeInstanceOf(PayableEntity);
    });

    it('should create a PayableEntity instance with an optional id', () => {
      const assignor = new AssignorEntity(
        '123e4567-e89b-12d3-a456-426614174000',
        '1234567890',
        'test@example.com',
        'John Doe',
        '1234567890',
        'login',
        'password',
      );
      const receivable = new PayableEntity(
        100,
        new Date(),
        assignor,
        '98765432-ABCD-ABCD-ABCD-ABCDEF012345',
      );
      expect(receivable).toBeInstanceOf(PayableEntity);
    });
  });

  describe('getters and setters', () => {
    let receivable: PayableEntity;
    let assignor: AssignorEntity;

    beforeEach(() => {
      assignor = new AssignorEntity(
        '123e4567-e89b-12d3-a456-426614174000',
        '1234567890',
        'test@example.com',
        'John Doe',
        '1234567890',
        'login',
        'password',
      );
      receivable = new PayableEntity(
        100,
        new Date(),
        assignor,
        '98765432-ABCD-ABCD-ABCD-ABCDEF012345',
      );
    });

    it('should get the id', () => {
      expect(receivable.id).toBe('98765432-ABCD-ABCD-ABCD-ABCDEF012345');
    });

    it('should set the id', () => {
      const result = receivable.setId('123e4567-e89b-12d3-a456-426614174000');
      expect(result.isLeft()).toBe(false);
      expect(receivable.id).toBe('123e4567-e89b-12d3-a456-426614174000');
    });

    it('should return a Left with ValidationError if the id is not a valid UUID', () => {
      const result = receivable.setId('invalid-id');
      expect(result.isLeft()).toBe(true);
      if (result.isLeft()) {
        expect(result.value.message).toBe(
          PayableValidationMessages.INVALID_UUID,
        );
      }
    });

    it('should allow setting the id to undefined', () => {
      const result = receivable.setId(undefined);
      expect(result.isLeft()).toBe(false);
      expect(receivable.id).toBeUndefined();
    });

    it('should return a Left with ValidationError if the id is not a valid UUID when setting it to a non-undefined value', () => {
      const result = receivable.setId('invalid-id');
      expect(result.isLeft()).toBe(true);
      if (result.isLeft()) {
        expect(result.value.message).toBe(
          PayableValidationMessages.INVALID_UUID,
        );
      }
    });

    it('should get the value', () => {
      expect(receivable.value).toBe(100);
    });

    it('should set the value', () => {
      receivable.value = 200;
      expect(receivable.value).toBe(200);
    });

    it('should get the emission date', () => {
      expect(receivable.emissionDate).toBeInstanceOf(Date);
    });

    it('should set the emission date', () => {
      const newDate = new Date();
      receivable.emissionDate = newDate;
      expect(receivable.emissionDate).toBe(newDate);
    });

    it('should get the assignor', () => {
      expect(receivable.assignor).toBe(assignor);
    });

    it('should set the assignor', () => {
      const newAssignor = new AssignorEntity(
        '123e4567-e89b-12d3-a456-426614174000',
        '0987654321',
        'new@example.com',
        'Jane Doe',
        '0987654321',
        'validLogin',
        'ValidPassword',
      );
      receivable.assignor = newAssignor;
      expect(receivable.assignor).toBe(newAssignor);
    });
  });
});
