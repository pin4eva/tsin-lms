import { Module } from "@nestjs/common";
import { AppController } from "./app.controller.js";
import { AppService } from "./app.service.js";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PrismaModule } from "./prisma.module.js";
import { AuthenticationModule } from "@nestjs/authentication";
import { UserModule } from "./user/user.module.js";
import { AuthorizationModule } from "@nestjs/authorization";

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [{ ttl: 60000, limit: 10 }],
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    AuthenticationModule.forRootAsync({
      // Opt-in: protect a controller or route with @UseGuards(AuthenticationGuard).
      globalGuard: false,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        session: {
          absoluteTtl: "14d",
          idleTtl: "1d",
          // Secure cookies aren't sent over plain http by Postman; keep them Secure in production.
          // Without `secure`, the cookie is named `sid` instead of `__Host-sid`.
          cookie: { secure: config.get("NODE_ENV") === "production" },
        },
        accessToken: {
          key: config.getOrThrow<string>("JWT_SECRET"),
          issuer: config.getOrThrow<string>("JWT_ISSUER"),
          audience: "lms",
          ttl: "1h",
        },
      }),
    }),
    AuthorizationModule.forRoot({
      // Opt-in: add AuthorizationGuard after AuthenticationGuard in @UseGuards().
      globalGuard: false,
    }),
    PrismaModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: "APP_GUARD", useClass: ThrottlerGuard }],
})
export class AppModule {}
