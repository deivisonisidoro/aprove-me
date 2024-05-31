import { Injectable } from "@nestjs/common";
import { SignInCredentialsDTO } from "../../../../domain/dtos/auth/SignInCredentialsDTO";
import { SignInUseCaseAbstract } from "../../../../domain/useCases/auth/SignInUseCaseAbstract";
import { Either, left, right } from "../../../../domain/either/either";
import { ValidationError } from "../../../../domain/errors/ValidationErros";
import { SignInResponseDTO } from "../../../../domain/dtos/auth/SignInResponseDTO";
import { AssignorRepositoryAbstract } from "../../../../domain/repositories/AssignorRepositoryAbstract";
import { AuthErrorMessageEnum } from "../../../../domain/enums/auth/AuthErrorMessageEnum";
import { RefreshTokenRepositoryAbstract } from "../../../../domain/repositories/RefreshToken";
import { GenerateRefreshTokenProviderAbstract } from "../../../../domain/providers/GenerateRefreshToken";

/**
 * This class implements the sign-in use case, which allows users to authenticate
 * with the system.
 */
@Injectable()
export class SignInUseCase extends SignInUseCaseAbstract{
  private assignorRepository: AssignorRepositoryAbstract;
  private refreshTokenRepository: RefreshTokenRepositoryAbstract;
  private generateRefreshTokenProvider: GenerateRefreshTokenProviderAbstract;

  constructor(
    assignorRepository: AssignorRepositoryAbstract, 
    refreshTokenRepository: RefreshTokenRepositoryAbstract,
    generateRefreshTokenProvider: GenerateRefreshTokenProviderAbstract
  ){
    super();
    this.assignorRepository = assignorRepository;
    this.refreshTokenRepository = refreshTokenRepository;
    this.generateRefreshTokenProvider = generateRefreshTokenProvider;
  }

  /**
   * Executes the sign-in use case.
   *
   * @param credentials An instance of the `SignInCredentialsDTO` containing login and password.
   *
   * @returns An `Either` containing either a `ValidationError` if the sign-in fails, or a
   * `SignInResponseDTO` containing the access and refresh tokens and the signed-in assignor
   * information.
   */
  async execute(credentials: SignInCredentialsDTO): Promise<Either<ValidationError, SignInResponseDTO>> {
    const createdAssignor = await  this.assignorRepository.findByLogin(credentials.login)
    if (!createdAssignor) {
      return left(new ValidationError(AuthErrorMessageEnum.EmailOrPasswordWrong))
    }
    if(createdAssignor.password !== credentials.password) {
      return left(new ValidationError(AuthErrorMessageEnum.EmailOrPasswordWrong))
    }
    const token = await this.generateRefreshTokenProvider.generateToken(
      createdAssignor.id,
    );
    const refreshTokenFounded =
      await this.refreshTokenRepository.findByAssignorId(createdAssignor.id);

    if (refreshTokenFounded) {
      await this.refreshTokenRepository.delete(createdAssignor.id);
    }

    const refreshToken = await this.refreshTokenRepository.create(createdAssignor.id);
    const signInDTO = new SignInResponseDTO(
      token,
      refreshToken,
      createdAssignor
    )
    return right(signInDTO);
  }
}