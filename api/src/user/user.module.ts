import { Module } from '@nestjs/common';
import { UserService } from './services/user.service.js';
import { AuthService } from './services/auth.service.js';

@Module({
  controllers: [],
  providers: [UserService,AuthService],
})
export class UserModule {}
