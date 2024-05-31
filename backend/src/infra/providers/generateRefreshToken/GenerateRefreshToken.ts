import { sign } from 'jsonwebtoken';
import { GenerateRefreshTokenProviderAbstract } from '../../../domain/providers/GenerateRefreshToken';
import { EnvironmentVariables } from '../../configs/EnvironmentVariables';
import { Injectable } from '@nestjs/common';


/**
 * Implementation of the refresh token generation provider.
 *
 * @class
 * @extends {GenerateRefreshTokenProviderAbstract}
 */
@Injectable()
export class GenerateRefreshTokenProvider
  extends GenerateRefreshTokenProviderAbstract
{
  /**
   * Generates a new refresh token based on the provided token.
   *
   * @async
   * @param {string} token - The token to use as a basis for the refresh token.
   * @returns {Promise<string>} The generated refresh token.
   * @throws {Error} Throws an error if the SECRET_KEY is missing in the environment variables.
   */
  async generateToken(token: string): Promise<string> {
    const env = EnvironmentVariables.getInstance();

    const secretKey = env.getSecretKey();
    const expiresIn = env.getAccessTokenExpiresIn();

    if (!secretKey) {
      throw new Error('API_SECRET is missing in the environment variables.');
    }

    const generatedToken = sign({}, secretKey, {
      subject: token,
      expiresIn,
    });

    return generatedToken;
  }
}
