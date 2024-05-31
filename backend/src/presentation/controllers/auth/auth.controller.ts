import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { SignInCredentialsDTO } from '../../../domain/dtos/auth/SignInCredentialsDTO';
import { SignInResponseDTO } from '../../../domain/dtos/auth/SignInResponseDTO';
import { SignInUseCaseAbstract } from '../../../domain/useCases/auth/SignInUseCaseAbstract';

/**
 * Controller for handling authentication-related endpoints.
 */
@Controller('auth')
export class AuthController {
  constructor(private signInUseCase: SignInUseCaseAbstract) {}

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
}
