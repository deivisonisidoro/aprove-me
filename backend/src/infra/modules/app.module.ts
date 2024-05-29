import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from '../database/prisma.module';
import { AssignorModule } from './assignor.module';
import { PayableModule } from './payable.module';

@Module({
  imports: [
    PrismaModule,
    AssignorModule,
    PayableModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
