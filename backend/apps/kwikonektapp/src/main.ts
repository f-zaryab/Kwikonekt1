import { NestFactory } from '@nestjs/core';
import { KwikonektappModule } from './kwikonektapp.module';

async function bootstrap() {
  const app = await NestFactory.create(KwikonektappModule);
  await app.listen(process.env.port ?? 3000);
}

void bootstrap();
