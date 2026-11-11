import { Injectable } from '@nestjs/common';
import { normalizeEmail } from '#src/utils/helper.js';
import { PrismaService } from '#src/prisma.service.js';
import { RegisterUserDTO } from '../dtos/user.dto.js';

@Injectable()
export class UserService{
  constructor(private prisma: PrismaService) { }

  // create user
  async createUser(input: RegisterUserDTO) {
    const email = normalizeEmail(input.email);
    const user = await this.prisma.user.create({
      data: {
        email,
        password: input.password,
        name: input.name,
      },
    });
    return user;
  }

  // get users

  // get user by id

  // update user

  // delete user

}
