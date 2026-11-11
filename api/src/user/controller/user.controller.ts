import { type User } from "#src/generated/client.js";
import { AuthenticationGuard, CurrentUser } from "@nestjs/authentication";
import { Controller, Get, Logger, Param, ParseIntPipe, UseGuards } from "@nestjs/common";
import { UserService } from "../services/user.service.js";

@Controller("user")
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.getUsers();
  }

  @Get("single/:id")
  getSingleUser(@Param("id", ParseIntPipe) id: number) {
    return this.userService.getUserById(id);
  }

  @UseGuards(AuthenticationGuard)
  @Get("me")
  me(@CurrentUser() user: User) {
    this.logger.log(`Current user: ${JSON.stringify(user)}`);
    return user;
  }
}
