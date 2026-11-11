import { Module } from "@nestjs/common";
import { UserService } from "./services/user.service.js";
import { AuthService } from "./services/auth.service.js";
import { SessionProvider } from "./providers/session.provider.js";
import { JwtProvider } from "./providers/jwt.provider.js";
import { AuthController } from './controller/auth.controller.js';
import { UserController } from './controller/user.controller.js';

@Module({
  controllers: [AuthController, UserController],
  providers: [UserService, AuthService, SessionProvider, JwtProvider],
})
export class UserModule {}
