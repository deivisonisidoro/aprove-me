import { AssignorEntity } from "./AssignorEntity";

describe("AssignorEntity", () => {
  describe("constructor", () => {
    it("should create an AssignorEntity instance with valid parameters", () => {
      const assignor = new AssignorEntity("123e4567-e89b-12d3-a456-426614174000", "1234567890", "test@example.com", "John Doe", "1234567890");
      expect(assignor).toBeInstanceOf(AssignorEntity);
    });

    it("should throw an error if the id is not a valid UUID", () => {
      expect(() => new AssignorEntity("invalid-id", "1234567890", "test@example.com", "John Doe", "1234567890")).toThrow("Invalid UUID format.");
    });

    it("should throw an error if the document exceeds 30 characters", () => {
      expect(() => new AssignorEntity("123e4567-e89b-12d3-a456-426614174000", "1234567890123456789012345678901", "test@example.com", "John Doe", "1234567890")).toThrow("Document must be 30 characters or less.");
    });

    it("should throw an error if the email is not in a valid format", () => {
      expect(() => new AssignorEntity("123e4567-e89b-12d3-a456-426614174000", "1234567890", "invalid-email", "John Doe", "1234567890")).toThrow("Email must be 140 characters or less and in a valid format.");
    });

    it("should throw an error if the email exceeds 140 characters", () => {
      const longEmail = "a".repeat(141) + "@example.com";
      expect(() => new AssignorEntity("123e4567-e89b-12d3-a456-426614174000", "1234567890", longEmail, "John Doe", "1234567890")).toThrow("Email must be 140 characters or less and in a valid format.");
    });

    it("should throw an error if the name exceeds 140 characters", () => {
      const longName = "John".repeat(36);
      expect(() => new AssignorEntity("123e4567-e89b-12d3-a456-426614174000", "1234567890", "test@example.com", longName, "1234567890")).toThrow("Name must be 140 characters or less.");
    });

    it("should throw an error if the phone number exceeds 20 characters", () => {
      const longPhone = "123456789012345678901";
      expect(() => new AssignorEntity("123e4567-e89b-12d3-a456-426614174000", "1234567890", "test@example.com", "John Doe", longPhone)).toThrow("Phone must be 20 characters or less.");
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
      assignor.id = "98765432-ABCD-ABCD-ABCD-ABCDEF012345";
      expect(assignor.id).toBe("98765432-ABCD-ABCD-ABCD-ABCDEF012345");
    });

    it("should get the document", () => {
      expect(assignor.document).toBe("1234567890");
    });

    it("should set the document", () => {
      assignor.document = "0987654321";
      expect(assignor.document).toBe("0987654321");
    });

    it("should get the email", () => {
      expect(assignor.email).toBe("test@example.com");
    });

    it("should set the email", () => {
      assignor.email = "new@example.com";
      expect(assignor.email).toBe("new@example.com");
    });

    it("should get the name", () => {
      expect(assignor.name).toBe("John Doe");
    });

    it("should set the name", () => {
      assignor.name = "Jane Doe";
      expect(assignor.name).toBe("Jane Doe");
    });

    it("should get the phone", () => {
      expect(assignor.phone).toBe("1234567890");
    });

    it("should set the phone", () => {
      assignor.phone = "0987654321";
      expect(assignor.phone).toBe("0987654321");
    });
  });
});
