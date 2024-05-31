/**
 * Data Transfer Object (DTO) representing a refresh token.
 *
 * @class
 */
export class RefreshTokenDTO {
  /**
   * The unique identifier for the refresh token.
   */
  id: string;

  /**
   * The expiration time of the refresh token (in seconds).
   */
  expires_in: number;

  /**
   * The assignor ID associated with the refresh token.
   */
  assignor_id: string;

  /**
   * The creation timestamp of the refresh token.
   */
  createdAt: Date;

  /**
   * Constructs a new RefreshTokenDTO object.
   * @param {string} id - The unique identifier for the refresh token.
   * @param {number} expires_in - The expiration time of the refresh token (in seconds).
   * @param {string} assignor_id - The assignor ID associated with the refresh token.
   * @param {Date} createdAt - The creation timestamp of the refresh token.
   */
  constructor(
    id: string,
    expires_in: number,
    assignor_id: string,
    createdAt: Date,
  ) {
    this.id = id;
    this.expires_in = expires_in;
    this.assignor_id = assignor_id;
    this.createdAt = createdAt;
  }
}
