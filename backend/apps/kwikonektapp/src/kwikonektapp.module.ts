import { Module } from '@nestjs/common';
import { KwikonektappController } from './kwikonektapp.controller';
import { KwikonektappService } from './kwikonektapp.service';
// Shared Lib
import { ConfigModule } from '@lib/common/config/config.module';
import { LoggerModule } from '@lib/common/logger/logger.module';

@Module({
  imports: [ConfigModule, LoggerModule],
  controllers: [KwikonektappController],
  providers: [KwikonektappService],
})
export class KwikonektappModule {}
