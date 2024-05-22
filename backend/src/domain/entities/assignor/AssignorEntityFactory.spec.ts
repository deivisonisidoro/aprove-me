import { AssignorEntityFactory } from "./AssignorEntityFactory";
import { AssignorEntity } from "./AssignorEntity";
import { ValidationMessages } from "../../enums/assignor/ValidationMessageEnum";
import { ValidationError } from "../../errors/ValidationErros";


describe("AssignorEntityFactory", () => {
  describe("createAssignorEntity", () => {
    it("should create an AssignorEntity instance with valid parameters", () => {
      const id = "123e4567-e89b-12d3-a456-426614174000";
      const document = "1234567890";
      const email = "test@example.com";
      const name = "John Doe";
      const phone = "1234567890";

      const result = AssignorEntityFactory.createAssignorEntity(id, document, email, name, phone);

      expect(result.isRight()).toBe(true);
      if (result.isRight()) {
        expect(result.value).toBeInstanceOf(AssignorEntity);
      }
    });

    it("should return a Left with ValidationError if the id is not a valid UUID", () => {
      const id = "invalid-id";
      const document = "1234567890";
      const email = "test@example.com";
      const name = "John Doe";
      const phone = "1234567890";

      const result = AssignorEntityFactory.createAssignorEntity(id, document, email, name, phone);

      expect(result.isLeft()).toBe(true);
      if (result.isLeft()) {
        expect(result.value).toBeInstanceOf(ValidationError);
        expect(result.value.message).toBe(ValidationMessages.INVALID_UUID);
      }
    });

    it("should return a Left with ValidationError if the document is too long", () => {
      const id = "123e4567-e89b-12d3-a456-426614174000";
      const document = "1234567890123456789012345678901"; // Longer than 30 characters
      const email = "test@example.com";
      const name = "John Doe";
      const phone = "1234567890";

      const result = AssignorEntityFactory.createAssignorEntity(id, document, email, name, phone);

      expect(result.isLeft()).toBe(true);
      if (result.isLeft()) {
        expect(result.value).toBeInstanceOf(ValidationError);
        expect(result.value.message).toBe(ValidationMessages.DOCUMENT_TOO_LONG);
      }
    });

    it("should return a Left with ValidationError if the email is too long", () => {
      const id = "123e4567-e89b-12d3-a456-426614174000";
      const document = "1234567890";
      const email = "a".repeat(141) + "@example.com"; // Longer than 140 characters
      const name = "John Doe";
      const phone = "1234567890";

      const result = AssignorEntityFactory.createAssignorEntity(id, document, email, name, phone);

      expect(result.isLeft()).toBe(true);
      if (result.isLeft()) {
        expect(result.value).toBeInstanceOf(ValidationError);
        expect(result.value.message).toBe(ValidationMessages.EMAIL_TOO_LONG);
      }
    });

    it("should return a Left with ValidationError if the email has invalid format", () => {
      const id = "123e4567-e89b-12d3-a456-426614174000";
      const document = "1234567890";
      const email = "invalid-email"; // Invalid email format
      const name = "John Doe";
      const phone = "1234567890";

      const result = AssignorEntityFactory.createAssignorEntity(id, document, email, name, phone);

      expect(result.isLeft()).toBe(true);
      if (result.isLeft()) {
        expect(result.value).toBeInstanceOf(ValidationError);
        expect(result.value.message).toBe(ValidationMessages.INVALID_EMAIL_FORMAT);
      }
    });

    it("should return a Left with ValidationError if the name is too long", () => {
      const id = "123e4567-e89b-12d3-a456-426614174000";
      const document = "1234567890";
      const email = "test@example.com";
      const name = "John".repeat(36); // Longer than 140 characters
      const phone = "1234567890";

      const result = AssignorEntityFactory.createAssignorEntity(id, document, email, name, phone);

      expect(result.isLeft()).toBe(true);
      if (result.isLeft()) {
        expect(result.value).toBeInstanceOf(ValidationError);
        expect(result.value.message).toBe(ValidationMessages.NAME_TOO_LONG);
      }
    });

    it("should return a Left with ValidationError if the phone number is too long", () => {
      const id = "123e4567-e89b-12d3-a456-426614174000";
      const document = "1234567890";
      const email = "test@example.com";
      const name = "John Doe";
      const phone = "123456789012345678901"; // Longer than 20 characters

      const result = AssignorEntityFactory.createAssignorEntity(id, document, email, name, phone);

      expect(result.isLeft()).toBe(true);
      if (result.isLeft()) {
        expect(result.value).toBeInstanceOf(ValidationError);
        expect(result.value.message).toBe(ValidationMessages.PHONE_TOO_LONG);
      }
    });
  });
});
