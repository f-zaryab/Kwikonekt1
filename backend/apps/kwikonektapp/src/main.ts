import { NestFactory } from '@nestjs/core';
import { KwikonektappModule } from './kwikonektapp.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(KwikonektappModule);

  // LOGGER
  const loggerService = app.get(Logger);
  app.useLogger(loggerService);

  // CONFIG
  const configService = app.get(ConfigService);
  const port = configService.getOrThrow<number>('PORT');

  await app.listen(port);
}

void bootstrap();
