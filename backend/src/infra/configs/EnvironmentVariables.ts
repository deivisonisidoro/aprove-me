import * as dotenv from 'dotenv';

dotenv.config();

/**
 * Class to handle environment variables in a Node.js application.
 */
export class EnvironmentVariables {
  private static instance: EnvironmentVariables;

  /**
   * Constructs the EnvironmentVariables class. Private constructor to enforce singleton pattern.
   */
  private constructor() {}

  /**
   * Returns a singleton instance of the EnvironmentVariables class.
   * @returns The singleton instance of the EnvironmentVariables class.
   */
  public static getInstance(): EnvironmentVariables {
    if (!EnvironmentVariables.instance) {
      EnvironmentVariables.instance = new EnvironmentVariables();
    }
    return EnvironmentVariables.instance;
  }

  /**
   * Retrieves the database URL from environment variables.
   * @returns The database URL.
   */
  public getDatabaseURL(): string {
    return process.env.DATABASE_URL || '';
  }

  /**
   * Retrieves the secret key from environment variables.
   * @returns The secret key.
   */
  public getSecretKey(): string {
    return process.env.SECRET_KEY || '';
  }

  /**
   * Retrieves the access token expiration time from environment variables.
   * @returns The access token expiration time.
   */
  public getAccessTokenExpiresIn(): string {
    return process.env.ACCESS_TOKEN_EXPIRES_IN || '';
  }

  /**
   * Retrieves the refresh token expiration time from environment variables.
   * @returns The refresh token expiration time.
   */
  public getRefreshTokenExpiresIn(): string {
    return process.env.REFRESH_TOKEN_EXPIRES_IN || '';
  }
}
