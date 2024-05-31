import { RefreshTokenDTO } from "../dtos/auth/RefreshTokenDTO";

/**
 * class for the repository handling refresh tokens.
 *
 * @class
 */
export abstract class RefreshTokenRepositoryAbstract {
  /**
   * Creates a new refresh token for the specified assignor.
   *
   * @async
   * @param {string} assignor_id - The ID of the assignor.
   * @returns {Promise<RefreshTokenDTO>} The created refresh token.
   */
  abstract create(assignor_id: string): Promise<RefreshTokenDTO>;

  /**
   * Finds a refresh token by its identifier.
   *
   * @async
   * @param {string} refreshToken - The refresh token identifier.
   * @returns {Promise<RefreshTokenDTO | unknown>} The found refresh token, or undefined if not found.
   */
  abstract findById(refreshToken: string): Promise<RefreshTokenDTO | unknown>;

  /**
   * Finds a refresh token by the assignor's ID.
   *
   * @async
   * @param {string} assignor_id - The ID of the assignor.
   * @returns {Promise<RefreshTokenDTO | unknown>} The found refresh token, or undefined if not found.
   */
  abstract findByAssignorId(
    assignor_id: string,
  ): Promise<RefreshTokenDTO | unknown>;

  /**
   * Deletes a refresh token associated with the specified assignor.
   *
   * @async
   * @param {string} assignor_id - The ID of the assignor.
   * @returns {Promise<void>} A promise that resolves when the refresh token is deleted.
   */
  abstract delete(assignor_id: string): Promise<void>;
}
