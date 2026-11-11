import { PickType } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class RegisterUserDTO {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
  @IsString()
  name: string;
}

export class LoginDTO extends PickType(RegisterUserDTO, ['email', 'password']) {}
