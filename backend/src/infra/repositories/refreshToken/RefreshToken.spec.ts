import { Test, TestingModule } from '@nestjs/testing';
import * as dayjs from 'dayjs';

import { RefreshTokenRepositoryAbstract } from '../../../domain/repositories/RefreshToken';
import { EnvironmentVariables } from '../../../infra/configs/EnvironmentVariables';
import { PrismaService } from '../../../infra/database/prisma.service';
import { RefreshTokenRepository } from './RefreshTokenRepository';

describe('RefreshTokenRepository', () => {
  let repository: RefreshTokenRepositoryAbstract;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RefreshTokenRepository,
        {
          provide: PrismaService,
          useValue: {
            refreshToken: {
              create: jest.fn(),
              findFirst: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<RefreshTokenRepository>(RefreshTokenRepository);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create a refresh token', async () => {
      const assignorId = 'assignorId';
      const env = EnvironmentVariables.getInstance();
      const refreshTokenExpiresIn = env.getRefreshTokenExpiresIn();
      const expiresIn = dayjs()
        .add(Number(refreshTokenExpiresIn), 'hour')
        .unix();
      const generatedToken = {
        id: 'token_id',
        assignor_id: assignorId,
        expires_in: expiresIn,
      };

      (prismaService.refreshToken.create as jest.Mock).mockResolvedValue(
        generatedToken,
      );

      const result = await repository.create(assignorId);

      expect(prismaService.refreshToken.create).toHaveBeenCalledWith({
        data: {
          assignor_id: assignorId,
          expires_in: expiresIn,
        },
      });
      expect(result).toEqual(generatedToken);
    });
  });

  describe('findById', () => {
    it('should find a refresh token by ID', async () => {
      const refreshTokenId = 'token_id';
      const foundToken = {
        id: refreshTokenId,
        assignor_id: 'assignorId',
        expires_in: 123456,
      };

      (prismaService.refreshToken.findFirst as jest.Mock).mockResolvedValue(
        foundToken,
      );

      const result = await repository.findById(refreshTokenId);

      expect(prismaService.refreshToken.findFirst).toHaveBeenCalledWith({
        where: {
          id: refreshTokenId,
        },
      });
      expect(result).toEqual(foundToken);
    });
  });

  describe('findByAssignorId', () => {
    it('should find a refresh token by assignor ID', async () => {
      const assignorId = 'assignorId';
      const foundToken = {
        id: 'token_id',
        assignor_id: assignorId,
        expires_in: 123456,
      };

      (prismaService.refreshToken.findFirst as jest.Mock).mockResolvedValue(
        foundToken,
      );

      const result = await repository.findByAssignorId(assignorId);

      expect(prismaService.refreshToken.findFirst).toHaveBeenCalledWith({
        where: {
          assignor_id: assignorId,
        },
      });
      expect(result).toEqual(foundToken);
    });
  });

  describe('delete', () => {
    it('should delete a refresh token by assignor ID', async () => {
      const assignorId = 'assignorId';

      await repository.delete(assignorId);

      expect(prismaService.refreshToken.delete).toHaveBeenCalledWith({
        where: {
          assignor_id: assignorId,
        },
      });
    });
  });
});
