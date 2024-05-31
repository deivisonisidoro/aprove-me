import { Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { GenerateRefreshTokenProviderAbstract } from '../../domain/providers/GenerateRefreshToken';
import { GenerateRefreshTokenProvider } from '../providers/generateRefreshToken/GenerateRefreshToken';
import { RefreshTokenRepositoryAbstract } from '../../domain/repositories/RefreshToken';
import { RefreshTokenRepository } from '../repositories/refreshToken/RefreshTokenRepository';
import { TokenManagerProvider } from '../providers/tokenManager/TokenManager';
import { TokenManagerProviderAbstract } from '../../domain/providers/TokenMagerProvider';
import { RefreshTokenUseCase } from '../../application/useCases/auth/refreshToken/RefreshTokenUseCase';
import { RefreshTokenUseCaseAbstract } from '../../domain/useCases/auth/RefreshTokenUseCaseAbstract';
import { SignInUseCase } from '../../application/useCases/auth/signIn/SignInUseCase';
import { SignInUseCaseAbstract } from '../../domain/useCases/auth/SignInUseCaseAbstract';

@Module({
  controllers: [],
  providers: [
    PrismaService,
    {
      provide: GenerateRefreshTokenProviderAbstract,
      useClass: GenerateRefreshTokenProvider,
    },
    {
      provide: RefreshTokenRepositoryAbstract,
      useClass: RefreshTokenRepository,
    },
    {
      provide: TokenManagerProviderAbstract,
      useClass: TokenManagerProvider
    },
    {
      provide: RefreshTokenUseCaseAbstract,
      useClass: RefreshTokenUseCase
    },
    {
      provide: SignInUseCaseAbstract,
      useClass: SignInUseCase
    }
  ],
  imports: [],
})
export class AuthModule {}
