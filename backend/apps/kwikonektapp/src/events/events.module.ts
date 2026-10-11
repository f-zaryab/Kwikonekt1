import { Module } from '@nestjs/common';
import { EventsController } from './api/events.controller';
import { EventsService } from './application/events.service';
import { EventsRepository } from './domain/repositories/events.repository';
import { PrismaEventRepository } from './infra/persistence/prisma-event.persistence';
// shared
import { PrismaModule } from '@lib/common/database/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [
    EventsService,
    {
      provide: EventsRepository,
      useClass: PrismaEventRepository,
    },
  ],
  controllers: [EventsController],
})
export class EventsModule {}
