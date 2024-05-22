import { ReceivablesEntityFactory } from "./ReceivablesEntityFactory";
import { ReceivablesEntity } from "./ReceivablesEntity";
import { AssignorEntity } from "../assignor/AssignorEntity";
import { ValidationMessages } from "../../enums/assignor/ValidationMessageEnum";
import { ValidationError } from "../../errors/ValidationErros";


describe("ReceivablesEntityFactory", () => {
  describe("createReceivablesEntity", () => {
    it("should create a ReceivablesEntity instance with valid parameters", () => {
      // Arrange
      const assignor = new AssignorEntity("123e4567-e89b-12d3-a456-426614174000", "1234567890", "test@example.com", "John Doe", "1234567890");
      
      // Act
      const result = ReceivablesEntityFactory.createReceivablesEntity(100, new Date(), assignor);

      // Assert
      expect(result.isRight()).toBe(true);
      if (result.isRight()) {
        expect(result.value).toBeInstanceOf(ReceivablesEntity);
      }
    });

    it("should create a ReceivablesEntity instance with an optional id", () => {
      // Arrange
      const assignor = new AssignorEntity("123e4567-e89b-12d3-a456-426614174000", "1234567890", "test@example.com", "John Doe", "1234567890");
      
      // Act
      const result = ReceivablesEntityFactory.createReceivablesEntity(100, new Date(), assignor, "98765432-ABCD-ABCD-ABCD-ABCDEF012345");

      // Assert
      expect(result.isRight()).toBe(true);
      if (result.isRight()) {
        expect(result.value).toBeInstanceOf(ReceivablesEntity);
      }
    });

    it("should return a Left with ValidationError if the id is not a valid UUID", () => {
      // Arrange
      const assignor = new AssignorEntity("123e4567-e89b-12d3-a456-426614174000", "1234567890", "test@example.com", "John Doe", "1234567890");
      
      // Act
      const result = ReceivablesEntityFactory.createReceivablesEntity(100, new Date(), assignor, "invalid-id");

      // Assert
      expect(result.isLeft()).toBe(true);
      if (result.isLeft()) {
        expect(result.value).toBeInstanceOf(ValidationError);
        expect(result.value.message).toBe(ValidationMessages.INVALID_UUID);
      }
    });
  });
});
