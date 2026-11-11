import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "../services/auth.service.js";
import { LoginDTO, RegisterUserDTO } from "../dtos/user.dto.js";
import { ApiBearerAuth } from "@nestjs/swagger";

@ApiBearerAuth()
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  signup(@Body() input: RegisterUserDTO) {
    return this.authService.signup(input);
  }

  @Post("login")
  login(@Body() input: LoginDTO) {
    return this.authService.verify(input);
  }
}
