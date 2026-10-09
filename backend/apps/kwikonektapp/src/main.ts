import { NestFactory } from '@nestjs/core';
import { KwikonektappModule } from './kwikonektapp.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(KwikonektappModule);

  // CONFIG
  const configService = app.get(ConfigService);
  const port = configService.getOrThrow<number>('PORT');

  await app.listen(port);
}

void bootstrap();
