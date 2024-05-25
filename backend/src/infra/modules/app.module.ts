import { Module } from '@nestjs/common';
import { PrismaModule } from '../database/prisma.module';
import { AssignorModule } from './assignor.module';


@Module({
  imports: [PrismaModule, AssignorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
