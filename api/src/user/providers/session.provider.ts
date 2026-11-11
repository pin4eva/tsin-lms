import { User } from "#src/generated/client.js";
import { PrismaService } from "#src/prisma.service.js";
import {
  AuthenticationRegistry,
  SessionCookieProvider,
  SessionRecord,
} from "@nestjs/authentication";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SessionProvider extends SessionCookieProvider<User> {
  constructor(
    private readonly registry: AuthenticationRegistry,
    private readonly prisma: PrismaService,
  ) {
    super();
    this.registry.registerProvider(this, { order: 2 });
  }

  async validate(session: SessionRecord) {
    return await this.prisma.user.findUnique({ where: { id: +session.userId } });
  }
}
