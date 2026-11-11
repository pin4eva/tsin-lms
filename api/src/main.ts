import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const PORT = process.env.PORT ?? 8000;
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useSecurityHeaders();
  app.enableCsrfProtection();
  await app.listen(PORT, () => {
    new Logger().debug(`Server is running on http://localhost:${PORT}`);
  });
}
await bootstrap();
