import { Module } from '@nestjs/common';

import { RefreshTokenUseCase } from '../../application/useCases/auth/refreshToken/RefreshTokenUseCase';
import { SignInUseCase } from '../../application/useCases/auth/signIn/SignInUseCase';
import { GenerateRefreshTokenProviderAbstract } from '../../domain/providers/GenerateRefreshToken';
import { TokenManagerProviderAbstract } from '../../domain/providers/TokenMagerProvider';
import { AssignorRepositoryAbstract } from '../../domain/repositories/AssignorRepositoryAbstract';
import { RefreshTokenRepositoryAbstract } from '../../domain/repositories/RefreshToken';
import { RefreshTokenUseCaseAbstract } from '../../domain/useCases/auth/RefreshTokenUseCaseAbstract';
import { SignInUseCaseAbstract } from '../../domain/useCases/auth/SignInUseCaseAbstract';
import { AuthController } from '../../presentation/controllers/auth/auth.controller';
import { PrismaService } from '../database/prisma.service';
import { AssignorMapper } from '../mappers/assignor/AssignorMapper';
import { GenerateRefreshTokenProvider } from '../providers/generateRefreshToken/GenerateRefreshToken';
import { TokenManagerProvider } from '../providers/tokenManager/TokenManager';
import { AssignorRepository } from '../repositories/assignor/AssignorRepository';
import { RefreshTokenRepository } from '../repositories/refreshToken/RefreshTokenRepository';

@Module({
  controllers: [AuthController],
  providers: [
    PrismaService,
    AssignorMapper,
    {
      provide: GenerateRefreshTokenProviderAbstract,
      useClass: GenerateRefreshTokenProvider,
    },
    {
      provide: AssignorRepositoryAbstract,
      useClass: AssignorRepository,
    },
    {
      provide: RefreshTokenRepositoryAbstract,
      useClass: RefreshTokenRepository,
    },
    {
      provide: TokenManagerProviderAbstract,
      useClass: TokenManagerProvider,
    },
    {
      provide: RefreshTokenUseCaseAbstract,
      useClass: RefreshTokenUseCase,
    },
    {
      provide: SignInUseCaseAbstract,
      useClass: SignInUseCase,
    },
  ],
  imports: [],
})
export class AuthModule {}
