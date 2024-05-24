import { AssignorValidationMessages } from '../../enums/assignor/AssignorValidationMessageEnum';
import { AssignorEntity } from './AssignorEntity';

describe('AssignorEntity', () => {
  describe('constructor', () => {
    it('should create an AssignorEntity instance with valid parameters', () => {
      const assignor = new AssignorEntity(
        '123e4567-e89b-12d3-a456-426614174000',
        '1234567890',
        'test@example.com',
        'John Doe',
        '1234567890',
        'validLogin',
        'Valid1@Password',
      );
      expect(assignor).toBeInstanceOf(AssignorEntity);
    });
  });

  describe('getters and setters', () => {
    let assignor: AssignorEntity;

    beforeEach(() => {
      assignor = new AssignorEntity(
        '123e4567-e89b-12d3-a456-426614174000',
        '1234567890',
        'test@example.com',
        'John Doe',
        '1234567890',
        'validLogin',
        'Valid1@Password',
      );
    });

    it('should get the id', () => {
      expect(assignor.id).toBe('123e4567-e89b-12d3-a456-426614174000');
    });

    it('should set the id', () => {
      const result = assignor.setId('98765432-ABCD-ABCD-ABCD-ABCDEF012345');
      expect(result.isLeft()).toBe(false);
      expect(assignor.id).toBe('98765432-ABCD-ABCD-ABCD-ABCDEF012345');
    });

    it('should return a Left with ValidationError if the id is not a valid UUID', () => {
      const result = assignor.setId('invalid-id');
      expect(result.isLeft()).toBe(true);
      if (result.isLeft()) {
        expect(result.value.message).toBe(
          AssignorValidationMessages.INVALID_UUID,
        );
      }
    });

    it('should get the document', () => {
      expect(assignor.document).toBe('1234567890');
    });

    it('should set the document', () => {
      const result = assignor.setDocument('0987654321');
      expect(result.isLeft()).toBe(false);
      expect(assignor.document).toBe('0987654321');
    });

    it('should return a Left with ValidationError if setting a document that exceeds 30 characters', () => {
      const result = assignor.setDocument('1234567890123456789012345678901');
      expect(result.isLeft()).toBe(true);
      if (result.isLeft()) {
        expect(result.value.message).toBe(
          AssignorValidationMessages.DOCUMENT_TOO_LONG,
        );
      }
    });

    it('should get the email', () => {
      expect(assignor.email).toBe('test@example.com');
    });

    it('should set the email', () => {
      const result = assignor.setEmail('new@example.com');
      expect(result.isLeft()).toBe(false);
      expect(assignor.email).toBe('new@example.com');
    });

    it('should return a Left with ValidationError if setting an email that exceeds 140 characters', () => {
      const longEmail = 'a'.repeat(141) + '@example.com';
      const result = assignor.setEmail(longEmail);
      expect(result.isLeft()).toBe(true);
      if (result.isLeft()) {
        expect(result.value.message).toBe(
          AssignorValidationMessages.EMAIL_TOO_LONG,
        );
      }
    });

    it('should return a Left with ValidationError if setting an invalid email format', () => {
      const result = assignor.setEmail('invalid-email');
      expect(result.isLeft()).toBe(true);
      if (result.isLeft()) {
        expect(result.value.message).toBe(
          AssignorValidationMessages.INVALID_EMAIL_FORMAT,
        );
      }
    });

    it('should get the name', () => {
      expect(assignor.name).toBe('John Doe');
    });

    it('should set the name', () => {
      const result = assignor.setName('Jane Doe');
      expect(result.isLeft()).toBe(false);
      expect(assignor.name).toBe('Jane Doe');
    });

    it('should return a Left with ValidationError if setting a name that exceeds 140 characters', () => {
      const longName = 'John'.repeat(36);
      const result = assignor.setName(longName);
      expect(result.isLeft()).toBe(true);
      if (result.isLeft()) {
        expect(result.value.message).toBe(
          AssignorValidationMessages.NAME_TOO_LONG,
        );
      }
    });

    it('should get the phone', () => {
      expect(assignor.phone).toBe('1234567890');
    });

    it('should set the phone', () => {
      const result = assignor.setPhone('0987654321');
      expect(result.isLeft()).toBe(false);
      expect(assignor.phone).toBe('0987654321');
    });

    it('should return a Left with ValidationError if setting a phone that exceeds 20 characters', () => {
      const longPhone = '123456789012345678901';
      const result = assignor.setPhone(longPhone);
      expect(result.isLeft()).toBe(true);
      if (result.isLeft()) {
        expect(result.value.message).toBe(
          AssignorValidationMessages.PHONE_TOO_LONG,
        );
      }
    });

    it('should get the login', () => {
      expect(assignor.login).toBe('validLogin');
    });

    it('should set the login', () => {
      const result = assignor.setLogin('newValidLogin');
      expect(result.isLeft()).toBe(false);
      expect(assignor.login).toBe('newValidLogin');
    });

    it('should return a Left with ValidationError if the login is too long', () => {
      const result = assignor.setLogin('a'.repeat(51));
      expect(result.isLeft()).toBe(true);
      if (result.isLeft()) {
        expect(result.value.message).toBe(
          AssignorValidationMessages.LOGIN_TOO_LONG,
        );
      }
    });

    it('should get the password', () => {
      expect(assignor.password).toBe('Valid1@Password');
    });

    it('should set the password', () => {
      const result = assignor.setPassword('NewValid1@Password');
      expect(result.isLeft()).toBe(false);
      expect(assignor.password).toBe('NewValid1@Password');
    });

    it('should return a Left with ValidationError if the password length is invalid', () => {
      const result = assignor.setPassword('short');
      expect(result.isLeft()).toBe(true);
      if (result.isLeft()) {
        expect(result.value.message).toBe(
          AssignorValidationMessages.PASSWORD_LENGTH_INVALID,
        );
      }
    });

    it('should return a Left with ValidationError if the password complexity is invalid', () => {
      const result = assignor.setPassword('simplepassword');
      expect(result.isLeft()).toBe(true);
      if (result.isLeft()) {
        expect(result.value.message).toBe(
          AssignorValidationMessages.PASSWORD_COMPLEXITY_INVALID,
        );
      }
    });
  });
});
