import { Module } from '@nestjs/common';
import { KwikonektappController } from './kwikonektapp.controller';
import { KwikonektappService } from './kwikonektapp.service';

@Module({
  imports: [],
  controllers: [KwikonektappController],
  providers: [KwikonektappService],
})
export class KwikonektappModule {}
