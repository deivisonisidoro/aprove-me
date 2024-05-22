import { Left } from "../../either/Left";
import { Right } from "../../either/Right";
import { ValidationError } from "../../errors/ValidationErros";
import { AssignorEntity } from "./AssignorEntity";
import { Either } from "../../either/either";

/**
 * Factory class for creating instances of AssignorEntity.
 */
export class AssignorEntityFactory {
  /**
   * Creates an AssignorEntity instance.
   * @param {string | undefined} id - The unique identifier for the assignor.
   * @param {string} document - The document number of the assignor.
   * @param {string} email - The email address of the assignor.
   * @param {string} name - The name of the assignor.
   * @param {string} phone - The phone number of the assignor.
   * @param {string} login - The login of the assignor.
   * @param {string | undefined} password - The password of the assignor.
   * @returns {Either<ValidationError, AssignorEntity>} Either containing ValidationError if validation fails, or AssignorEntity instance if successful.
   */
  public static createAssignorEntity(
    id: string | undefined, 
    document: string, 
    email: string, 
    name: string, 
    phone: string, 
    login: string, 
    password?: string
  ): Either<ValidationError, AssignorEntity> {
    const assignor = new AssignorEntity(id, document, email, name, phone, login, password);

    const idValidation = assignor.setId(id);
    if (idValidation.isLeft()) {
      return new Left(idValidation.value);
    }

    const documentValidation = assignor.setDocument(document);
    if (documentValidation.isLeft()) {
      return new Left(documentValidation.value);
    }

    const emailValidation = assignor.setEmail(email);
    if (emailValidation.isLeft()) {
      return new Left(emailValidation.value);
    }

    const nameValidation = assignor.setName(name);
    if (nameValidation.isLeft()) {
      return new Left(nameValidation.value);
    }

    const phoneValidation = assignor.setPhone(phone);
    if (phoneValidation.isLeft()) {
      return new Left(phoneValidation.value);
    }

    const loginValidation = assignor.setLogin(login);
    if (loginValidation.isLeft()) {
      return new Left(loginValidation.value);
    }

    if (password !== undefined) {
      const passwordValidation = assignor.setPassword(password);
      if (passwordValidation.isLeft()) {
        return new Left(passwordValidation.value);
      }
    }

    return new Right(assignor);
  }
}
