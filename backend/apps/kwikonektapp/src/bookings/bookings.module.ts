import { Module } from '@nestjs/common';
import { BookingsController } from './api/bookings.controller';
import { BookingsService } from './application/bookings.service';
import { BookingsRepository } from './domain/repositories/booking.repository';
import { PrismaBookingRepository } from './infra/persistence/prisma-booking.persistence';
// external
import { PrismaModule } from '@lib/common/database/prisma/prisma.module';
import { EventLookupPort } from './application/ports/event-lookup.port';
import { PrismaEventLookupAdapter } from './infra/adapters/prisma-event-lookup.adapter';

@Module({
  imports: [PrismaModule],
  controllers: [BookingsController],
  providers: [
    BookingsService,
    {
      provide: BookingsRepository,
      useClass: PrismaBookingRepository,
    },
    {
      provide: EventLookupPort,
      useClass: PrismaEventLookupAdapter,
    },
  ],
})
export class BookingsModule {}
