import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';

import { RefreshTokenDTO } from '../../../domain/dtos/auth/RefreshTokenDTO';
import { RefreshTokenRepositoryAbstract } from '../../../domain/repositories/RefreshToken';
import { EnvironmentVariables } from '../../../infra/configs/EnvironmentVariables';
import { PrismaService } from '../../../infra/database/prisma.service';

/**
 * Prisma implementation of the refresh token repository.
 *
 * @class
 * @extends {RefreshTokenRepositoryAbstract}
 */
@Injectable()
export class RefreshTokenRepository extends RefreshTokenRepositoryAbstract {
  /**
   * Constructs the PrismaassignorRepository.
   * @param {PrismaService} prisma - The Prisma service for database access.
   */
  constructor(private prisma: PrismaService) {
    super();
  }

  /**
   * Creates a new refresh token for the specified assignor.
   *
   * @async
   * @param {string} assignorId - The ID of the assignor for whom the refresh token is created.
   * @returns {Promise<RefreshTokenDTO>} The generated refresh token.
   */
  async create(assignorId: string): Promise<RefreshTokenDTO> {
    const env = EnvironmentVariables.getInstance();
    const refreshTokenExpiresIn = env.getRefreshTokenExpiresIn();
    const expiresIn = dayjs().add(Number(refreshTokenExpiresIn), 'hour').unix();

    const generateRefreshToken = await this.prisma.refreshToken.create({
      data: {
        assignor_id: assignorId,
        expires_in: expiresIn,
      },
    });

    return generateRefreshToken;
  }

  /**
   * Finds a refresh token by its ID.
   *
   * @async
   * @param {string} refreshToken - The ID of the refresh token to find.
   * @returns {Promise<RefreshTokenDTO | unknown>} The found refresh token or undefined.
   */
  async findById(refreshToken: string): Promise<RefreshTokenDTO | unknown> {
    const token = await this.prisma.refreshToken.findFirst({
      where: {
        id: refreshToken,
      },
    });

    return token;
  }

  /**
   * Finds a refresh token by assignor ID.
   *
   * @async
   * @param {string} assignorId - The ID of the assignor for whom to find the refresh token.
   * @returns {Promise<RefreshTokenDTO | unknown>} The found refresh token or undefined.
   */
  async findByAssignorId(
    assignorId: string,
  ): Promise<RefreshTokenDTO | unknown> {
    const token = await this.prisma.refreshToken.findFirst({
      where: {
        assignor_id: assignorId,
      },
    });

    return token;
  }

  /**
   * Deletes a refresh token associated with the specified assignor ID.
   *
   * @async
   * @param {string} assignorId - The ID of the assignor for whom to delete the refresh token.
   * @returns {Promise<void>} A Promise that resolves once the refresh token is deleted.
   */
  async delete(assignorId: string): Promise<void> {
    await this.prisma.refreshToken.delete({
      where: {
        assignor_id: assignorId,
      },
    });
  }
}
