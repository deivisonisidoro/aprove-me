import { Either } from "../../either/either";
import { SignInCredentialsDTO } from "../../dtos/auth/SignInCredentialsDTO";
import { ValidationError } from "../../errors/ValidationErros";
import { SignInResponseDTO } from "../../dtos/auth/SignInResponseDTO";

export abstract class SignInUseCaseAbstract {
  /**
   * Método abstrato que deve ser implementado pelas subclasses para autenticar um cedente (assignor).
   * 
   * @param credentials - As credenciais necessárias para autenticar o cedente.
   * @returns - Um token de autenticação ou uma mensagem de erro.
   */
  abstract execute(credentials: SignInCredentialsDTO): Promise<Either<ValidationError,SignInResponseDTO>>;
}
