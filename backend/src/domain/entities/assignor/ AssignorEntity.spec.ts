import { ValidationMessages } from "../../enums/assignor/ValidationMessageEnum";
import { AssignorEntity } from "./AssignorEntity";


describe("AssignorEntity", () => {
  describe("constructor", () => {
    it("should create an AssignorEntity instance with valid parameters", () => {
      const assignor = new AssignorEntity("123e4567-e89b-12d3-a456-426614174000", "1234567890", "test@example.com", "John Doe", "1234567890");
      expect(assignor).toBeInstanceOf(AssignorEntity);
    });
  });

  describe("getters and setters", () => {
    let assignor: AssignorEntity;

    beforeEach(() => {
      assignor = new AssignorEntity("123e4567-e89b-12d3-a456-426614174000", "1234567890", "test@example.com", "John Doe", "1234567890");
    });

    it("should get the id", () => {
      expect(assignor.id).toBe("123e4567-e89b-12d3-a456-426614174000");
    });

    it("should set the id", () => {
      assignor.setId("98765432-ABCD-ABCD-ABCD-ABCDEF012345");
      expect(assignor.id).toBe("98765432-ABCD-ABCD-ABCD-ABCDEF012345");
    });

    it("should return a Left with ValidationError if the id is not a valid UUID", () => {
      const result = assignor.setId("invalid-id");
      expect(result.isLeft()).toBe(true);
      if (result.isLeft()) {
        expect(result.value.message).toBe(ValidationMessages.INVALID_UUID);
      }
    });

    it("should get the document", () => {
      expect(assignor.document).toBe("1234567890");
    });

    it("should set the document", () => {
      assignor.setDocument("0987654321");
      expect(assignor.document).toBe("0987654321");
    });

    it("should throw an error if setting a document that exceeds 30 characters", () => {
      const result = assignor.setDocument("1234567890123456789012345678901");
      expect(result.isLeft()).toBe(true);
      if (result.isLeft()) {
        expect(result.value.message).toBe(ValidationMessages.DOCUMENT_TOO_LONG);
      }
    });
 
    it("should get the email", () => {
      expect(assignor.email).toBe("test@example.com");
    });

    it("should set the email", () => {
      assignor.setEmail("new@example.com");
      expect(assignor.email).toBe("new@example.com");
    });

    it("should throw an error if setting an email that exceeds 140 characters", () => {
      const longEmail = "a".repeat(141) + "@example.com";
      const result = assignor.setEmail(longEmail);
      expect(result.isLeft()).toBe(true);
      if (result.isLeft()) {
        expect(result.value.message).toBe(ValidationMessages.EMAIL_TOO_LONG);
      }
    });

    it("should throw an error if setting an invalid email format", () => {
      const result = assignor.setEmail("invalid-email");
      expect(result.isLeft()).toBe(true);
      if (result.isLeft()) {
        expect(result.value.message).toBe(ValidationMessages.INVALID_EMAIL_FORMAT);
      }
    });

    it("should get the name", () => {
      expect(assignor.name).toBe("John Doe");
    });

    it("should set the name", () => {
      assignor.setName("Jane Doe");
      expect(assignor.name).toBe("Jane Doe");
    });

    it("should throw an error if setting a name that exceeds 140 characters", () => {
      const longName = "John".repeat(36);
      const result = assignor.setName(longName);
      expect(result.isLeft()).toBe(true);
      if (result.isLeft()) {
        expect(result.value.message).toBe(ValidationMessages.NAME_TOO_LONG);
      }
    });

    it("should get the phone", () => {
      expect(assignor.phone).toBe("1234567890");
    });

    it("should set the phone", () => {
      assignor.setPhone("0987654321");
      expect(assignor.phone).toBe("0987654321");
    });

    it("should throw an error if setting a phone that exceeds 20 characters", () => {
      const longPhone = "123456789012345678901";
      const result = assignor.setPhone(longPhone);
      expect(result.isLeft()).toBe(true);
      if (result.isLeft()) {
        expect(result.value.message).toBe(ValidationMessages.PHONE_TOO_LONG);
      }
    });
  });
});
