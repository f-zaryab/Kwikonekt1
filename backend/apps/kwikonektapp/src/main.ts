import { NestFactory } from '@nestjs/core';
import { KwikonektappModule } from './kwikonektapp.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(KwikonektappModule);

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // LOGGER
  const loggerService = app.get(Logger);
  app.useLogger(loggerService);

  // CONFIG
  const configService = app.get(ConfigService);
  const port = configService.getOrThrow<number>('PORT');

  await app.listen(port);
}

void bootstrap();
