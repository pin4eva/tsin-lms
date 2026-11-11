import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module.js";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const PORT = process.env.PORT ?? 8000;
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useSecurityHeaders();
  app.enableCsrfProtection();
  app.useGlobalPipes();
  app.setGlobalPrefix("api");

  const config = new DocumentBuilder()
    .setTitle("LMS API")
    .setDescription("The LMS API description")
    .setVersion("1.0")
    .addBearerAuth()
    .addCookieAuth("session", {
      type: "apiKey",
      in: "cookie",
      name: process.env.NODE_ENV === "production" ? "__Host-sid" : "sid",
    })
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, config, {
      autoTagControllers: true,
    });
  SwaggerModule.setup("api/docs", app, documentFactory, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(PORT, () => {
    new Logger().debug(`Server is running on http://localhost:${PORT}`);
  });
}
await bootstrap();
