/**
 * Data Transfer Object (DTO) representing the input for refreshing a Assignor's authentication token.
 *
 * @class
 */
export class RefreshTokenAssignorDTO {
  /**
   * The identifier of the refresh token used for authentication token refresh.
   */
  refreshTokenId: string;

  /**
   * Constructs a new RefreshTokenAssignorDTO object.
   * @param {string} refreshTokenId - The identifier of the refresh token.
   */
  constructor(refreshTokenId: string) {
    this.refreshTokenId = refreshTokenId;
  }
}
