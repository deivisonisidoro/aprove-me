import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { RefreshTokenDTO } from '../../../domain/dtos/auth/RefreshTokenDTO';
import { SignInCredentialsDTO } from '../../../domain/dtos/auth/SignInCredentialsDTO';
import { SignInResponseDTO } from '../../../domain/dtos/auth/SignInResponseDTO';
import { right, left } from '../../../domain/either/either';
import { AssignorEntity } from '../../../domain/entities/assignor/AssignorEntity';
import { AuthErrorMessageEnum } from '../../../domain/enums/auth/AuthErrorMessageEnum';
import { ValidationError } from '../../../domain/errors/ValidationErros';
import { RefreshTokenUseCaseAbstract } from '../../../domain/useCases/auth/RefreshTokenUseCaseAbstract';
import { SignInUseCaseAbstract } from '../../../domain/useCases/auth/SignInUseCaseAbstract';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let authController: AuthController;
  let signInUseCase: SignInUseCaseAbstract;
  let refreshTokenUseCase: RefreshTokenUseCaseAbstract;

  const assignorEntity = new AssignorEntity(
    '123e4567-e89b-12d3-a456-426614174000',
    '1234567890',
    'test@example.com',
    'John Doe',
    '1234567890',
    'validLogin',
    'Valid1@Password',
  );
  const emailOrPasswordWrong = left(
    new ValidationError(AuthErrorMessageEnum.EmailOrPasswordWrong),
  );

  beforeEach(async () => {
    const mockSignInUseCase = {
      execute: jest.fn(),
    };

    const mockRefreshTokenUseCase = {
      execute: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: SignInUseCaseAbstract,
          useValue: mockSignInUseCase,
        },
        {
          provide: RefreshTokenUseCaseAbstract,
          useValue: mockRefreshTokenUseCase,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    signInUseCase = module.get<SignInUseCaseAbstract>(SignInUseCaseAbstract);
    refreshTokenUseCase = module.get<RefreshTokenUseCaseAbstract>(
      RefreshTokenUseCaseAbstract,
    );
  });

  describe('login', () => {
    it('should return SignInResponseDTO when login is successful', async () => {
      const credentials: SignInCredentialsDTO = {
        login: 'testuser',
        password: 'testpassword',
      };
      const refreshTokenDTO: RefreshTokenDTO = {
        id: 'some-id',
        expires_in: 100,
        assignor_id: 'some-id',
        createdAt: new Date(),
      };

      const signInResponse: SignInResponseDTO = {
        access_token: 'some-jwt-token',
        assignor: assignorEntity,
        refreshToken: refreshTokenDTO,
      };

      jest
        .spyOn(signInUseCase, 'execute')
        .mockResolvedValue(right(signInResponse));

      const result = await authController.signIn(credentials);

      expect(result).toEqual(signInResponse);
    });

    it('should throw BadRequestException when login fails', async () => {
      const credentials: SignInCredentialsDTO = {
        login: 'testuser',
        password: 'testpassword',
      };

      signInUseCase.execute = jest.fn().mockResolvedValue(emailOrPasswordWrong);

      await expect(authController.signIn(credentials)).rejects.toThrow(
        BadRequestException,
      );
      await expect(authController.signIn(credentials)).rejects.toThrow(
        AuthErrorMessageEnum.EmailOrPasswordWrong,
      );
    });
  });

  describe('refresh-token', () => {
    it('should return RefreshTokenAssignorDTO when refresh token is successful', async () => {
      const refreshTokenDTO: RefreshTokenDTO = {
        id: 'some-id',
        expires_in: 100,
        assignor_id: 'some-id',
        createdAt: new Date(),
      };
      const refreshTokenResponse = right({
        refreshTokenDTO,
        token: 'some-token',
      });
      refreshTokenUseCase.execute = jest
        .fn()
        .mockResolvedValue(refreshTokenResponse);

      const result = await authController.refreshToken({
        refreshTokenId: 'some-id',
      });

      expect(result).toEqual(refreshTokenResponse.value);
    });

    it('should throw BadRequestException when refresh token fails', async () => {
      const refreshTokenResponse = left(
        new ValidationError(AuthErrorMessageEnum.TokenInvalidOrExpired),
      );
      refreshTokenUseCase.execute = jest
        .fn()
        .mockResolvedValue(refreshTokenResponse);

      await expect(
        authController.refreshToken({ refreshTokenId: 'some-id' }),
      ).rejects.toThrow(BadRequestException);

      await expect(
        authController.refreshToken({ refreshTokenId: 'some-id' }),
      ).rejects.toThrow(AuthErrorMessageEnum.TokenInvalidOrExpired);
    });
  });
});
