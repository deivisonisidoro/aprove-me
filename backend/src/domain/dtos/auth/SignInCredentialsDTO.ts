/**
 * DTO (Data Transfer Object) que representa as credenciais necessárias para autenticar um cedente (assignor).
 */
export class SignInCredentialsDTO {
  /**
   * Cria uma instância de SignInUseCaseCredentialsDTO.
   *
   * @param login - O nome de usuário (login) do cedente.
   * @param password - A senha do cedente.
   */
  constructor(
    public login: string,
    public password: string,
  ) {}
}
