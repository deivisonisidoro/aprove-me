import { RefreshTokenAssignorDTO } from '../../../domain/dtos/auth/RefreshTokenAssignorDTO';
import { RefreshTokenDTO } from '../../../domain/dtos/auth/RefreshTokenDTO';
import { Either } from '../../../domain/either/either';
import { ValidationError } from '../../../domain/errors/ValidationErros';

export type RefreshTokenResponse = Either<
  ValidationError,
  { refreshToken?: RefreshTokenDTO; token: string }
>;

/**
 * Abstract class for the use case of refreshing a user's authentication token.
 *
 * This abstract class defines the contract for a use case responsible for refreshing
 * a user's authentication token using a provided refresh token identifier.
 *
 * @class
 */
export abstract class RefreshTokenUseCaseAbstract {
  /**
   * Executes the refresh token user use case.
   *
   * @async
   * @param {RefreshTokenAssignorDTO} refreshToken - The refresh token information.
   * @returns {Promise<RefreshToken>} The response data.
   *
   * @remarks
   * This method is responsible for handling the logic of refreshing a user's
   * authentication token based on the provided refresh token identifier.
   */
  abstract execute(
    refreshToken: RefreshTokenAssignorDTO,
  ): Promise<RefreshTokenResponse>;
}
