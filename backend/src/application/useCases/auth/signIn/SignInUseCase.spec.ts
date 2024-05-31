import { SignInCredentialsDTO } from '../../../../domain/dtos/auth/SignInCredentialsDTO';
import { left } from '../../../../domain/either/either';
import { AuthErrorMessageEnum } from '../../../../domain/enums/auth/AuthErrorMessageEnum';
import { ValidationError } from '../../../../domain/errors/ValidationErros';
import { GenerateRefreshTokenProviderAbstract } from '../../../../domain/providers/GenerateRefreshToken';
import { AssignorRepositoryAbstract } from '../../../../domain/repositories/AssignorRepositoryAbstract';
import { RefreshTokenRepositoryAbstract } from '../../../../domain/repositories/RefreshToken';
import { SignInUseCase } from './SignInUseCase';

describe('SignInUseCase', () => {
  let assignorRepository: AssignorRepositoryAbstract;
  let generateRefreshTokenProvider: GenerateRefreshTokenProviderAbstract;
  let refreshTokenRepository: RefreshTokenRepositoryAbstract;
  let signInUseCase: SignInUseCase;

  const emailOrPasswordWrong = left(
    new ValidationError(AuthErrorMessageEnum.EmailOrPasswordWrong),
  );

  beforeEach(() => {
    assignorRepository = {} as AssignorRepositoryAbstract;
    refreshTokenRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findByAssignorId: jest.fn(),
      delete: jest.fn(),
    };
    generateRefreshTokenProvider = {
      generateToken: jest.fn(),
    };

    signInUseCase = new SignInUseCase(
      assignorRepository,
      refreshTokenRepository,
      generateRefreshTokenProvider,
    );
  });

  describe('execute', () => {
    it('should return an access token when authentication is successful', async () => {
      const credentials: SignInCredentialsDTO = {
        login: 'test',
        password: 'password',
      };
      const mockassignor = {
        id: '1',
        email: 'test@example.com',
        password: 'password',
      };
      assignorRepository.findByLogin = jest
        .fn()
        .mockResolvedValue(mockassignor);
      generateRefreshTokenProvider.generateToken = jest
        .fn()
        .mockResolvedValue('mock-token');

      const result = await signInUseCase.execute(credentials);

      expect(result.isRight()).toBe(true);
      expect(result.value).toHaveProperty('access_token');
      expect(result.value).toHaveProperty('refreshToken');
      expect(result.value).toHaveProperty('assignor');
    });

    it('should return an error when the assignor does not exist', async () => {
      const credentials: SignInCredentialsDTO = {
        login: 'test',
        password: 'password',
      };
      assignorRepository.findByLogin = jest.fn().mockResolvedValue(null);

      const result = await signInUseCase.execute(credentials);

      expect(result.isLeft()).toBe(true);
      expect(result.value.constructor).toBe(ValidationError);
      expect(result.value).toStrictEqual(emailOrPasswordWrong.value);
    });

    it('should return an error when the password is incorrect', async () => {
      const credentials: SignInCredentialsDTO = {
        login: 'test',
        password: 'password',
      };
      const mockassignor = {
        id: '1',
        email: 'test@example.com',
        password: 'incorrect-password',
      };
      assignorRepository.findByLogin = jest
        .fn()
        .mockResolvedValue(mockassignor);
      const result = await signInUseCase.execute(credentials);

      expect(result.isLeft()).toBe(true);
      expect(result.value.constructor).toBe(ValidationError);
      expect(result.value).toStrictEqual(emailOrPasswordWrong.value);
    });
  });
});
