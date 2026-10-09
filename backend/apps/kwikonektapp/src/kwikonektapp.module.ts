import { Module } from '@nestjs/common';
import { KwikonektappController } from './kwikonektapp.controller';
import { KwikonektappService } from './kwikonektapp.service';
import { ConfigModule } from '@lib/common/config/config.module';

@Module({
  imports: [ConfigModule],
  controllers: [KwikonektappController],
  providers: [KwikonektappService],
})
export class KwikonektappModule {}
