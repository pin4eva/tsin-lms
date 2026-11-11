import { AuthStrategy } from "#src/generated/client.js";
import { TokenPair } from "@nestjs/authentication";
import { ApiProperty, ApiPropertyOptional, PickType } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsString } from "class-validator";

export class RegisterUserDTO {
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsString()
  password: string;
  @ApiProperty()
  @IsString()
  name: string;
}

export class LoginDTO extends PickType(RegisterUserDTO, ["email", "password"]) {
  @ApiProperty()
  @IsEnum(AuthStrategy)
  strategy: AuthStrategy;
}

export type AuthResponse = TokenPair & { role?: string };
