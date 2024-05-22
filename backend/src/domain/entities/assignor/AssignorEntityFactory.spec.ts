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
      const login = "john_doe";
      const password = "P@ssword123";

      const result = AssignorEntityFactory.createAssignorEntity(id, document, email, name, phone, login, password);

      expect(result.isRight()).toBe(true);
      if (result.isRight()) {
        expect(result.value).toBeInstanceOf(AssignorEntity);
      }
    });

    it("should return a Left with ValidationError if the login is too long", () => {
      const id = "123e4567-e89b-12d3-a456-426614174000";
      const document = "1234567890";
      const email = "test@example.com";
      const name = "John Doe";
      const phone = "1234567890";
      const login = "a".repeat(51); // Longer than 50 characters
      const password = "P@ssword123";

      const result = AssignorEntityFactory.createAssignorEntity(id, document, email, name, phone, login, password);

      expect(result.isLeft()).toBe(true);
      if (result.isLeft()) {
        expect(result.value).toBeInstanceOf(ValidationError);
        expect(result.value.message).toBe(ValidationMessages.LOGIN_TOO_LONG);
      }
    });

    it("should return a Left with ValidationError if the password length is invalid", () => {
      const id = "123e4567-e89b-12d3-a456-426614174000";
      const document = "1234567890";
      const email = "test@example.com";
      const name = "John Doe";
      const phone = "1234567890";
      const login = "john_doe";
      const password = "abc"; // Less than 8 characters

      const result = AssignorEntityFactory.createAssignorEntity(id, document, email, name, phone, login, password);

      expect(result.isLeft()).toBe(true);
      if (result.isLeft()) {
        expect(result.value).toBeInstanceOf(ValidationError);
        expect(result.value.message).toBe(ValidationMessages.PASSWORD_LENGTH_INVALID);
      }
    });

    it("should return a Left with ValidationError if the password complexity is invalid", () => {
      const id = "123e4567-e89b-12d3-a456-426614174000";
      const document = "1234567890";
      const email = "test@example.com";
      const name = "John Doe";
      const phone = "1234567890";
      const login = "john_doe";
      const password = "password123"; // Does not contain special character

      const result = AssignorEntityFactory.createAssignorEntity(id, document, email, name, phone, login, password);

      expect(result.isLeft()).toBe(true);
      if (result.isLeft()) {
        expect(result.value).toBeInstanceOf(ValidationError);
        expect(result.value.message).toBe(ValidationMessages.PASSWORD_COMPLEXITY_INVALID);
      }
    });
  });
});
