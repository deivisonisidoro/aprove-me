import { AssignorValidationMessages } from '../../enums/assignor/AssignorValidationMessageEnum';
import { ValidationError } from '../../errors/ValidationErros';
import { AssignorEntity } from './AssignorEntity';
import { AssignorEntityFactory } from './AssignorEntityFactory';

describe('AssignorEntityFactory', () => {
  describe('createAssignorEntity', () => {
    it('should create an AssignorEntity instance with valid parameters', () => {
      const id = '123e4567-e89b-12d3-a456-426614174000';
      const document = '1234567890';
      const email = 'test@example.com';
      const name = 'John Doe';
      const phone = '1234567890';
      const login = 'john_doe';
      const password = 'P@ssword123';

      const result = AssignorEntityFactory.createAssignorEntity(
        id,
        document,
        email,
        name,
        phone,
        login,
        password,
      );

      expect(result.isRight()).toBe(true);
      if (result.isRight()) {
        expect(result.value).toBeInstanceOf(AssignorEntity);
      }
    });

    it('should return a Left with ValidationError if the login is too long', () => {
      const id = '123e4567-e89b-12d3-a456-426614174000';
      const document = '1234567890';
      const email = 'test@example.com';
      const name = 'John Doe';
      const phone = '1234567890';
      const login = 'a'.repeat(51); // Longer than 50 characters
      const password = 'P@ssword123';

      const result = AssignorEntityFactory.createAssignorEntity(
        id,
        document,
        email,
        name,
        phone,
        login,
        password,
      );

      expect(result.isLeft()).toBe(true);
      if (result.isLeft()) {
        expect(result.value).toBeInstanceOf(ValidationError);
        expect(result.value.message).toBe(AssignorValidationMessages.LOGIN_TOO_LONG);
      }
    });

    it('should return a Left with ValidationError if the password length is invalid', () => {
      const id = '123e4567-e89b-12d3-a456-426614174000';
      const document = '1234567890';
      const email = 'test@example.com';
      const name = 'John Doe';
      const phone = '1234567890';
      const login = 'john_doe';
      const password = 'abc'; // Less than 8 characters

      const result = AssignorEntityFactory.createAssignorEntity(
        id,
        document,
        email,
        name,
        phone,
        login,
        password,
      );

      expect(result.isLeft()).toBe(true);
      if (result.isLeft()) {
        expect(result.value).toBeInstanceOf(ValidationError);
        expect(result.value.message).toBe(
          AssignorValidationMessages.PASSWORD_LENGTH_INVALID,
        );
      }
    });

    it('should return a Left with ValidationError if the password complexity is invalid', () => {
      const id = '123e4567-e89b-12d3-a456-426614174000';
      const document = '1234567890';
      const email = 'test@example.com';
      const name = 'John Doe';
      const phone = '1234567890';
      const login = 'john_doe';
      const password = 'password123'; // Does not contain special character

      const result = AssignorEntityFactory.createAssignorEntity(
        id,
        document,
        email,
        name,
        phone,
        login,
        password,
      );

      expect(result.isLeft()).toBe(true);
      if (result.isLeft()) {
        expect(result.value).toBeInstanceOf(ValidationError);
        expect(result.value.message).toBe(
          AssignorValidationMessages.PASSWORD_COMPLEXITY_INVALID,
        );
      }
    });

    it('should return a Left with ValidationError if the email format is invalid', () => {
      const id = '123e4567-e89b-12d3-a456-426614174000';
      const document = '1234567890';
      const email = 'invalid-email'; // Invalid email format
      const name = 'John Doe';
      const phone = '1234567890';
      const login = 'john_doe';
      const password = 'P@ssword123';

      const result = AssignorEntityFactory.createAssignorEntity(
        id,
        document,
        email,
        name,
        phone,
        login,
        password,
      );

      expect(result.isLeft()).toBe(true);
      if (result.isLeft()) {
        expect(result.value).toBeInstanceOf(ValidationError);
        expect(result.value.message).toBe(AssignorValidationMessages.INVALID_EMAIL_FORMAT);
      }
    });
  });

  describe('updateAssignorEntity', () => {
    const assignor = new AssignorEntity(
      '123e4567-e89b-12d3-a456-426614174000',
      '1234567890',
      'test@example.com',
      'John Doe',
      '1234567890',
      'validLogin',
      'Valid1@Password',
    );
    it('should update an AssignorEntity instance with valid parameters', () => {
      const document = 'new-1234567890';
      const email = 'new-test@example.com';
      const name = 'new-John Doe';
      const phone = 'new-1234567890';
      const login = 'new-john_doe';
      const password = 'new-P@ssword123';

      const result = AssignorEntityFactory.updateAssignorEntity(
        assignor,
        document,
        email,
        name,
        phone,
        login,
        password,
      );

      expect(result.isRight()).toBe(true);
      if (result.isRight()) {
        expect(result.value).toBeInstanceOf(AssignorEntity);
      }
    });

    it('should return a Left with ValidationError if updating with invalid email format', () => {
      const email = 'invalid-email';

      const result = AssignorEntityFactory.updateAssignorEntity(assignor, undefined, email);

      expect(result.isLeft()).toBe(true);
      if (result.isLeft()) {
        expect(result.value).toBeInstanceOf(ValidationError);
        expect(result.value.message).toBe(AssignorValidationMessages.INVALID_EMAIL_FORMAT);
      }
    });

    it('should return a Left with ValidationError if updating with invalid password length', () => {
      const password = 'short';

      const result = AssignorEntityFactory.updateAssignorEntity(assignor, undefined, undefined, undefined, undefined, undefined, password);

      expect(result.isLeft()).toBe(true);
      if (result.isLeft()) {
        expect(result.value).toBeInstanceOf(ValidationError);
        expect(result.value.message).toBe(AssignorValidationMessages.PASSWORD_LENGTH_INVALID);
      }
    });

    it('should return a Left with ValidationError if updating with invalid password complexity', () => {
      const password = 'simplepassword';

      const result = AssignorEntityFactory.updateAssignorEntity(assignor, undefined, undefined, undefined, undefined, undefined, password);

      expect(result.isLeft()).toBe(true);
      if (result.isLeft()) {
        expect(result.value).toBeInstanceOf(ValidationError);
        expect(result.value.message).toBe(AssignorValidationMessages.PASSWORD_COMPLEXITY_INVALID);
      }
    });
  });
});
