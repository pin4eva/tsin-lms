import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma.module.js';
import { AuthenticationModule } from '@nestjs/authentication';
import { UserModule } from './user/user.module.js';
import { AuthorizationModule } from '@nestjs/authorization';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers:[{ttl:60000, limit: 10}],
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    AuthenticationModule.forRoot({
      session:{
        absoluteTtl: '14d',
        idleTtl: '1d',
      }
    }),
    AuthorizationModule.forRoot({

    }),
    PrismaModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService, { provide: 'APP_GUARD', useClass: ThrottlerGuard }],
})
export class AppModule {}
