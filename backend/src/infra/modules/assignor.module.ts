import { Module } from '@nestjs/common';

import { PrismaService } from '../database/prisma.service';

@Module({
  controllers: [],
  providers: [PrismaService],
  imports: [],
})
export class AssignorModule {}
