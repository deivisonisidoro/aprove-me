import { Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { AssignorRepository } from '../repositories/assignor/AssignorRepository';
import { AssignorRepositoryAbstract } from 'src/domain/repositories/AssignorRepositoryAbstract';
import { AssignorMapper } from '../mappers/assignor/AssignorMapper';

@Module({
  controllers:[],
  providers: [
    PrismaService,
    AssignorMapper,
    {
      provide: AssignorRepositoryAbstract,
      useClass: AssignorRepository
    }
  ],
  imports: [],
})
export class AssignorModule {}
