import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { RefreshTokenAssignorDTO } from '../../../domain/dtos/auth/RefreshTokenAssignorDTO';
import { RefreshTokenDTO } from '../../../domain/dtos/auth/RefreshTokenDTO';
import { SignInCredentialsDTO } from '../../../domain/dtos/auth/SignInCredentialsDTO';
import { SignInResponseDTO } from '../../../domain/dtos/auth/SignInResponseDTO';
import { RefreshTokenUseCaseAbstract } from '../../../domain/useCases/auth/RefreshTokenUseCaseAbstract';
import { SignInUseCaseAbstract } from '../../../domain/useCases/auth/SignInUseCaseAbstract';

/**
 * Controller for handling authentication-related endpoints.
 */
@Controller('auth')
export class AuthController {
  constructor(
    private signInUseCase: SignInUseCaseAbstract,
    private refreshTokenUseCase: RefreshTokenUseCaseAbstract,
  ) {}

  /**
   * Endpoint for customer login.
   * @param {SignInCredentialsDTO} credentials - The login request DTO.
   * @returns {Promise<SignInResponseDTO>} The result of the login operation.
   */
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() credentials: SignInCredentialsDTO,
  ): Promise<SignInResponseDTO> {
    const dto = new SignInCredentialsDTO(
      credentials.login,
      credentials.password,
    );
    const result = await this.signInUseCase.execute(dto);
    if (result.isLeft()) {
      throw new BadRequestException(result.value.message);
    }
    return result.value;
  }

  /**
   * Endpoint for refreshing token.
   * @param {RefreshTokenAssignorDTO} refreshTokenAssignorDTO - The refresh token request DTO.
   * @returns {Promise<{ refreshToken?: RefreshTokenDTO; token: string }>} The result of the refresh token operation.
   */
  @HttpCode(HttpStatus.OK)
  @Post('refresh-token')
  async refreshToken(
    @Body() refreshTokenAssignorDTO: RefreshTokenAssignorDTO,
  ): Promise<{ refreshToken?: RefreshTokenDTO; token: string }> {
    const result = await this.refreshTokenUseCase.execute(
      refreshTokenAssignorDTO,
    );
    if (result.isLeft()) {
      throw new BadRequestException(result.value.message);
    }
    return result.value;
  }
}
