import { Module } from '@nestjs/common';

import { CreatePayableUseCase } from '../../application/useCases/payable/create/CretaePayableUseCase';
import { DeletePayableUseCase } from '../../application/useCases/payable/delete/DeletePayableUseCase';
import { ReadPayableByIdUseCase } from '../../application/useCases/payable/read/ReadPayableByIdUseCase';
import { UpdatePayableUseCase } from '../../application/useCases/payable/update/UpdatePayableUseCase';
import { PayableRepositoryAbstract } from '../../domain/repositories/PayableRepositoryAbstract';
import { CreatePayableUseCaseAbstract } from '../../domain/useCases/payable/CreatePayableUseCase';
import { DeletePayableUseCaseAbstract } from '../../domain/useCases/payable/DeletePayableUseCase';
import { ReadPayableByIdUseCaseAbstract } from '../../domain/useCases/payable/ReadPayableByIdUseCase';
import { UpdatePayableUseCaseAbstract } from '../../domain/useCases/payable/UpdatePayableUseCase';
import { PayableController } from '../../presentation/controllers/payables/payable.controller';
import { PrismaService } from '../database/prisma.service';
import { PayableMapper } from '../mappers/payable/PayableMapper';
import { PayableRepository } from '../repositories/payable/PayableRepository';

@Module({
  controllers: [PayableController],
  providers: [
    PrismaService,
    PayableMapper,
    {
      provide: PayableRepositoryAbstract,
      useClass: PayableRepository,
    },
    {
      provide: CreatePayableUseCaseAbstract,
      useClass: CreatePayableUseCase,
    },
    {
      provide: ReadPayableByIdUseCaseAbstract,
      useClass: ReadPayableByIdUseCase,
    },
    {
      provide: UpdatePayableUseCaseAbstract,
      useClass: UpdatePayableUseCase,
    },
    {
      provide: DeletePayableUseCaseAbstract,
      useClass: DeletePayableUseCase,
    },
  ],
  imports: [],
})
export class PayableModule {}
