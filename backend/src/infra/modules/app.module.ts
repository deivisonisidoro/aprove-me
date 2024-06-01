import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from '../database/prisma.module';
import { AssignorModule } from './assignor.module';
import { AuthModule } from './auth.module';
import { PayableModule } from './payable.module';
import { LoggerMiddleware } from '../../presentation/middlewares/ensureAuthenticated';

@Module({
  imports: [
    PrismaModule,
    AssignorModule,
    PayableModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: 'assignor', method: RequestMethod.POST },
        { path: 'auth/login', method: RequestMethod.POST },
      )
      .forRoutes('assignor', 'auth', 'payables');
  }
}