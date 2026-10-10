import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { ConfigModule } from './config/config.module';
import { LoggerModule } from './logger/logger.module';
import { DatabaseModule } from './database/database.module';

@Module({
  providers: [CommonService],
  exports: [CommonService],
  imports: [ConfigModule, LoggerModule, DatabaseModule],
})
export class CommonModule {}
