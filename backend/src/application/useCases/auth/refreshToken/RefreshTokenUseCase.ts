import { Injectable } from '@nestjs/common';

import { RefreshTokenAssignorDTO } from '../../../../domain/dtos/auth/RefreshTokenAssignorDTO';
import { RefreshTokenDTO } from '../../../../domain/dtos/auth/RefreshTokenDTO';
import { left, right } from '../../../../domain/either/either';
import { AuthErrorMessageEnum } from '../../../../domain/enums/auth/AuthErrorMessageEnum';
import { ValidationError } from '../../../../domain/errors/ValidationErros';
import { GenerateRefreshTokenProviderAbstract } from '../../../../domain/providers/GenerateRefreshToken';
import { TokenManagerProviderAbstract } from '../../../../domain/providers/TokenMagerProvider';
import { RefreshTokenRepositoryAbstract } from '../../../../domain/repositories/RefreshToken';
import {
  RefreshTokenUseCaseAbstract,
  RefreshTokenResponse,
} from '../../../../domain/useCases/auth/RefreshTokenUseCaseAbstract';

/**
 * Use case for refreshing a customer's authentication token.
 *
 * @class
 * @extends {RefreshTokenUseCaseAbstract}
 */
@Injectable()
export class RefreshTokenUseCase extends RefreshTokenUseCaseAbstract {
  /**
   * Creates an instance of RefreshTokencustomerUseCase.
   *
   * @constructor
   * @param {GenerateRefreshTokenProviderAbstract} generateRefreshTokenProvider - The refresh token generator provider.
   * @param {RefreshTokenRepositoryAbstract} refreshTokenRepository - The repository for refresh tokens.
   * @param {TokenManagerProviderAbstract} tokenManager - The token manager provider.
   */
  constructor(
    private generateRefreshTokenProvider: GenerateRefreshTokenProviderAbstract,
    private refreshTokenRepository: RefreshTokenRepositoryAbstract,
    private tokenManager: TokenManagerProviderAbstract,
  ) {
    super();
  }

  /**
   * Executes the refresh token customer use case.
   *
   * @async
   * @param {IRefreshTokenAssignorDTO} refreshTokenId - The refresh token information.
   * @returns {Promise<RefreshToken>} The response data.
   */
  async execute({
    refreshTokenId,
  }: RefreshTokenAssignorDTO): Promise<RefreshTokenResponse> {
    const refreshToken = (await this.refreshTokenRepository.findById(
      refreshTokenId,
    )) as RefreshTokenDTO | null;

    if (!refreshToken) {
      return left(
        new ValidationError(AuthErrorMessageEnum.TokenInvalidOrExpired),
      );
    }

    const refreshTokenExpired = this.tokenManager.validateTokenAge(
      refreshToken.expires_in,
    );
    const token = await this.generateRefreshTokenProvider.generateToken(
      refreshToken.assignor_id,
    );

    if (refreshTokenExpired) {
      await this.refreshTokenRepository.delete(refreshToken.assignor_id);
      const newRefreshToken = await this.refreshTokenRepository.create(
        refreshToken.assignor_id,
      );
      return right({ refreshToken: newRefreshToken, token });
    }

    return right({ token });
  }
}
