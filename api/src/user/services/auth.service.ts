import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../../prisma.service.js";
import { AuthResponse, LoginDTO, RegisterUserDTO } from "../dtos/user.dto.js";
import { normalizeEmail } from "#src/utils/helper.js";
import { PasswordHasher, SignInService, TokenService } from "@nestjs/authentication";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly passwordHasher: PasswordHasher,
    private readonly tokenService: TokenService,
    private readonly signInService: SignInService,
  ) {}

  // Signup
  async signup(input: RegisterUserDTO) {
    const { password, name } = input;
    const email = normalizeEmail(input.email);
    const isExistingUser = await this.prisma.user.findUnique({ where: { email } });
    if (isExistingUser) {
      throw new ConflictException("User already exists");
    }
    const hashedPassword = await this.passwordHasher.hash(password);
    const user = await this.prisma.user.create({
      data: {
        email,
        name,
        auths: {
          create: {
            password: hashedPassword,
          },
        },
      },
    });
    return user;
  }

  // Verify user credentials
  async verify(input: LoginDTO) {
    const { password, strategy } = input;
    const user = await this.prisma.user.findUnique({
      where: { email: normalizeEmail(input.email) },
      include: {
        auths: {
          where: { strategy },
          select: { password: true },
        },
      },
    });
    if (!user) {
      throw new UnauthorizedException("Please signup first");
    }
    const auth = user.auths[0];

    const valid = await this.passwordHasher.verify(password, auth.password);
    if (!valid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    if (this.passwordHasher.needsRehash(auth.password)) {
      await this.prisma.auth.update({
        where: { userId_strategy: { userId: user.id, strategy } },
        data: { password: await this.passwordHasher.hash(password) },
      });
    }
    const { session } = await this.signInService.signIn(user.id.toString(), { method: "password" });

    // return this.issueToken(user.id);
    return session;
  }

  private issueToken(userId: number) {
    return this.tokenService.issue(userId.toString(), {
      method: "password",
      claims: { amr: ["pwd"] },
    });
  }
}
