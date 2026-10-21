import { Injectable } from '@nestjs/common';
import {
  BookableEvent,
  EventLookupPort,
} from '../../application/ports/event-lookup.port';
import { PrismaService } from '@lib/common/database/prisma/prisma.service';

@Injectable()
export class PrismaEventLookupAdapter implements EventLookupPort {
  constructor(private readonly prisma: PrismaService) {}

  findById(eventId: string): Promise<BookableEvent | null> {
    return this.prisma.event.findUnique({
      where: {
        id: eventId,
      },
      select: {
        id: true,
        title: true,
        durationMinutes: true,
        isActive: true,
        userId: true,
      },
    });
  }
}
