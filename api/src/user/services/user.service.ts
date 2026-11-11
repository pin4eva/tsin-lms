import { Injectable } from "@nestjs/common";
import { normalizeEmail } from "#src/utils/helper.js";
import { PrismaService } from "#src/prisma.service.js";
import { RegisterUserDTO } from "../dtos/user.dto.js";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

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
  async getUsers() {
    return await this.prisma.user.findMany();
  }

  // get user by id
  async getUserById(id: number) {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  // update user

  // delete user
}
