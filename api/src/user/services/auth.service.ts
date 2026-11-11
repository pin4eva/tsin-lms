import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service.js';
import { LoginDTO, RegisterUserDTO } from '../dtos/user.dto.js';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService,

  ) { }

  // Signup
  async signup(input: RegisterUserDTO) { }

  // Signin
  async login(input: LoginDTO) {

  }

}
