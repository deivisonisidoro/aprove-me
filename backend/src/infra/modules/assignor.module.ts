import { Module } from '@nestjs/common';

import { CreateAssignorUseCase } from '../../application/useCases/assignor/create/CreateAsignorUseCase';
import { DeleteAssignorUseCase } from '../../application/useCases/assignor/delete/DeleteAssignorUseCase';
import { ReadAssignorByIdUseCase } from '../../application/useCases/assignor/read/ReadAssignorByIdUseCase';
import { UpdateAssignorUseCase } from '../../application/useCases/assignor/update/UpdateAssignorUseCase';
import { AssignorRepositoryAbstract } from '../../domain/repositories/AssignorRepositoryAbstract';
import { CreateAssignorUseCaseAbstract } from '../../domain/useCases/assignor/CreateAssignorUseCaseAbstract ';
import { DeleteAssignorUseCaseAbstract } from '../../domain/useCases/assignor/DeleteAssignorUseCaseAbstract';
import { ReadAssignorByIdUseCaseAbstract } from '../../domain/useCases/assignor/ReadAssignorByIdUseCaseAbstract';
import { UpdateAssignorUseCaseAbstract } from '../../domain/useCases/assignor/UpdateUseCaseAbstract';
import { AssignorController } from '../../presentation/controllers/assignors/assignor.controller';
import { PrismaService } from '../database/prisma.service';
import { AssignorMapper } from '../mappers/assignor/AssignorMapper';
import { AssignorRepository } from '../repositories/assignor/AssignorRepository';

@Module({
  controllers: [AssignorController],
  providers: [
    PrismaService,
    AssignorMapper,
    {
      provide: AssignorRepositoryAbstract,
      useClass: AssignorRepository,
    },
    {
      provide: CreateAssignorUseCaseAbstract,
      useClass: CreateAssignorUseCase,
    },
    {
      provide: ReadAssignorByIdUseCaseAbstract,
      useClass: ReadAssignorByIdUseCase,
    },
    {
      provide: UpdateAssignorUseCaseAbstract,
      useClass: UpdateAssignorUseCase,
    },
    {
      provide: DeleteAssignorUseCaseAbstract,
      useClass: DeleteAssignorUseCase,
    },
  ],
  imports: [],
})
export class AssignorModule {}
