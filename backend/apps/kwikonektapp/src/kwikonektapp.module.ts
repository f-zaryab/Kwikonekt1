import { Module } from '@nestjs/common';
import { KwikonektappController } from './kwikonektapp.controller';
import { KwikonektappService } from './kwikonektapp.service';
// Shared Lib
import { ConfigModule } from '@lib/common/config/config.module';
import { LoggerModule } from '@lib/common/logger/logger.module';
import { EventsModule } from './events/events.module';
import { BookingsModule } from './bookings/bookings.module';

@Module({
  imports: [ConfigModule, LoggerModule, EventsModule, BookingsModule],
  controllers: [KwikonektappController],
  providers: [KwikonektappService],
})
export class KwikonektappModule {}
