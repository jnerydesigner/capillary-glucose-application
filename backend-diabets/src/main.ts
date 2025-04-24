/* eslint-disable @typescript-eslint/no-floating-promises */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './infra/modules/app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const logger = new Logger();
  const config = new ConfigService();
  const PORT = config.get<number>('SERVER_PORT', 3333);

  await app.listen(PORT, () => {
    logger.log(`Server running port ${PORT}`);
  });
}
bootstrap();
