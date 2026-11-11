import { User } from "#src/generated/client.js";
import { PrismaService } from "#src/prisma.service.js";
import { AuthenticationRegistry, JwtBearerProvider, JwtClaims } from "@nestjs/authentication";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtProvider extends JwtBearerProvider<User> {
  constructor(
    private readonly registry: AuthenticationRegistry,
    private readonly prisma: PrismaService,
  ) {
    super({ realm: "store" });
    this.registry.registerProvider(this, { order: 0 });
  }

  validate({ sub }: JwtClaims) {
    return sub ? this.prisma.user.findUnique({ where: { id: +sub } }) : null;
  }
}
