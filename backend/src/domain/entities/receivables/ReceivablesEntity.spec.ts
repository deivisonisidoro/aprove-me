import { ReceivablesEntity } from "./ReceivablesEntity";
import { AssignorEntity } from "../assignor/AssignorEntity";

describe("ReceivablesEntity", () => {
  describe("constructor", () => {
    it("should create a ReceivablesEntity instance with valid parameters", () => {
      const assignor = new AssignorEntity("123e4567-e89b-12d3-a456-426614174000", "1234567890", "test@example.com", "John Doe", "1234567890");
      const receivable = new ReceivablesEntity(100, new Date(), assignor);
      expect(receivable).toBeInstanceOf(ReceivablesEntity);
    });

    it("should create a ReceivablesEntity instance with an optional id", () => {
      const assignor = new AssignorEntity("123e4567-e89b-12d3-a456-426614174000", "1234567890", "test@example.com", "John Doe", "1234567890");
      const receivable = new ReceivablesEntity(100, new Date(), assignor, "98765432-ABCD-ABCD-ABCD-ABCDEF012345");
      expect(receivable).toBeInstanceOf(ReceivablesEntity);
    });
  });

  describe("getters and setters", () => {
    let receivable: ReceivablesEntity;
    let assignor: AssignorEntity;

    beforeEach(() => {
      assignor = new AssignorEntity("123e4567-e89b-12d3-a456-426614174000", "1234567890", "test@example.com", "John Doe", "1234567890");
      receivable = new ReceivablesEntity(100, new Date(), assignor, "98765432-ABCD-ABCD-ABCD-ABCDEF012345");
    });

    it("should get the id", () => {
      expect(receivable.id).toBe("98765432-ABCD-ABCD-ABCD-ABCDEF012345");
    });

    it("should set the id", () => {
      receivable.id = "123e4567-e89b-12d3-a456-426614174000";
      expect(receivable.id).toBe("123e4567-e89b-12d3-a456-426614174000");
    });
    
    it("should throw a ValidationError if the id is not a valid UUID", () => {
      expect(() => {
        receivable.id = "invalid-id";
      }).toThrow("Invalid UUID format.");
    });

    it("should allow setting the id to undefined", () => {
      receivable.id = undefined;
      expect(receivable.id).toBeUndefined();
    });
    
    it("should throw a ValidationError if the id is not a valid UUID when setting it to a non-undefined value", () => {
      expect(() => {
        receivable.id = "invalid-id";
      }).toThrow("Invalid UUID format.");
    });

    it("should get the value", () => {
      expect(receivable.value).toBe(100);
    });

    it("should set the value", () => {
      receivable.value = 200;
      expect(receivable.value).toBe(200);
    });

    it("should get the emission date", () => {
      expect(receivable.emissionDate).toBeInstanceOf(Date);
    });

    it("should set the emission date", () => {
      const newDate = new Date();
      receivable.emissionDate = newDate;
      expect(receivable.emissionDate).toBe(newDate);
    });

    it("should get the assignor", () => {
      expect(receivable.assignor).toBe(assignor);
    });

    it("should set the assignor", () => {
      const newAssignor = new AssignorEntity("123e4567-e89b-12d3-a456-426614174000", "0987654321", "new@example.com", "Jane Doe", "0987654321");
      receivable.assignor = newAssignor;
      expect(receivable.assignor).toBe(newAssignor);
    });
  });
});
