/**
 * Unit tests for the RefreshTokenAssignorUseCase class using Vitest.
 * @module RefreshTokenAssignorUseCaseTests
 */

import { left } from '../../../../domain/either/either';
import { AuthErrorMessageEnum } from '../../../../domain/enums/auth/AuthErrorMessageEnum';
import { ValidationError } from '../../../../domain/errors/ValidationErros';
import { GenerateRefreshTokenProviderAbstract } from '../../../../domain/providers/GenerateRefreshToken';
import { TokenManagerProviderAbstract } from '../../../../domain/providers/TokenMagerProvider';
import { RefreshTokenRepositoryAbstract } from '../../../../domain/repositories/RefreshToken';
import { RefreshTokenUseCase } from './RefreshTokenUseCase';

/**
 * Test suite for the RefreshTokenAssignorUseCase class.
 * @function
 * @name RefreshTokenUseCaseTests
 */
describe('RefreshTokenUseCase', () => {
  let refreshTokenAssignorUseCase: RefreshTokenUseCase;
  let generateRefreshTokenProvider: GenerateRefreshTokenProviderAbstract;
  let refreshTokenRepository: RefreshTokenRepositoryAbstract;
  let tokenManager: TokenManagerProviderAbstract;
  const mockRefreshTokenId = { refreshTokenId: 'mockRefreshTokenId' };
  const mockRefreshToken = {
    assignor_id: 'mockAssignorId',
    expires_in: 'mockExpiresIn',
  };
  const tokenInvalidOrExpired = left(
    new ValidationError(AuthErrorMessageEnum.TokenInvalidOrExpired),
  );

  /**
   * Set up before each test case.
   * @function
   * @name beforeEach
   */
  beforeEach(() => {
    refreshTokenRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findByAssignorId: jest.fn(),
      delete: jest.fn(),
    };
    generateRefreshTokenProvider = {
      generateToken: jest.fn(),
    };
    tokenManager = {
      validateToken: jest.fn(),
      validateTokenAge: jest.fn(),
    };
    refreshTokenAssignorUseCase = new RefreshTokenUseCase(
      generateRefreshTokenProvider,
      refreshTokenRepository,
      tokenManager,
    );
  });

  /**
   * Clean up after each test case.
   * @function
   * @name afterEach
   */
  afterEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Test suite for the execute method of RefreshTokenAssignorUseCase.
   * @function
   * @name execute
   */
  describe('execute', () => {
    /**
     * Test case to verify an error response when the refresh token is invalid.
     * @function
     * @name shouldReturnErrorWhenRefreshTokenIsInvalid
     */
    it('should return an error response when the refresh token is invalid', async () => {
      refreshTokenRepository.findById = jest.fn().mockResolvedValueOnce(null);

      const result =
        await refreshTokenAssignorUseCase.execute(mockRefreshTokenId);

      expect(result.value).toEqual(tokenInvalidOrExpired.value);
      expect(refreshTokenRepository.findById).toHaveBeenCalledWith(
        mockRefreshTokenId.refreshTokenId,
      );
    });

    /**
     * Test case to verify a new refresh token and token are returned when the refresh token has expired.
     * @function
     * @name shouldReturnNewRefreshTokenWhenExpired
     */
    it('should return a new refresh token and token when the refresh token has expired', async () => {
      refreshTokenRepository.findById = jest
        .fn()
        .mockResolvedValueOnce(mockRefreshToken);
      tokenManager.validateTokenAge = jest.fn().mockReturnValueOnce(true);
      generateRefreshTokenProvider.generateToken = jest
        .fn()
        .mockResolvedValueOnce('newMockRefreshToken');

      const result =
        await refreshTokenAssignorUseCase.execute(mockRefreshTokenId);

      expect(result.value).toHaveProperty('token');
      expect(result.value).toHaveProperty('refreshToken');
      expect(refreshTokenRepository.delete).toHaveBeenCalledWith(
        mockRefreshToken.assignor_id,
      );
      expect(generateRefreshTokenProvider.generateToken).toHaveBeenCalledWith(
        mockRefreshToken.assignor_id,
      );
    });

    /**
     * Test case to verify only a token is returned when the refresh token is valid and has not expired.
     * @function
     * @name shouldReturnTokenWhenValidAndNotExpired
     */
    it('should return a token when the refresh token is valid and has not expired', async () => {
      refreshTokenRepository.findById = jest
        .fn()
        .mockResolvedValueOnce(mockRefreshToken);
      tokenManager.validateTokenAge = jest.fn().mockReturnValueOnce(false);
      generateRefreshTokenProvider.generateToken = jest
        .fn()
        .mockResolvedValueOnce('mockGeneratedToken');

      const result =
        await refreshTokenAssignorUseCase.execute(mockRefreshTokenId);

      expect(result.value).toEqual({ token: 'mockGeneratedToken' });
      expect(refreshTokenRepository.delete).not.toHaveBeenCalled();
    });
  });
});
