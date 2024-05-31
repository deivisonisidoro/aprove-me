import { ReadAssignorDTO } from '../assignor/ReadAssignorDTO';
import { RefreshTokenDTO } from './RefreshTokenDTO';

/**
 * DTO (Data Transfer Object) que representa a resposta de uma operação de autenticação.
 */
export class SignInResponseDTO {
  constructor(
    public access_token: string,
    public refreshToken: RefreshTokenDTO,
    public assignor: ReadAssignorDTO,
  ) {}
}
