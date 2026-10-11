import { Injectable } from '@nestjs/common';
import { Event } from '../../domain/entities/event.entity';
import {
  CreateEventData,
  EventsRepository,
  UpdateEventData,
} from '../../domain/repositories/events.repository';
// external
import { PrismaService } from '@lib/common/database/prisma/prisma.service';
import { Prisma } from 'generated/prisma/client';

@Injectable()
export class PrismaEventRepository extends EventsRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  findAll(): Promise<Event[]> {
    return this.prisma.event.findMany();
  }

  findEventById(id: string): Promise<Event | null> {
    return this.prisma.event.findUnique({
      where: {
        id: id,
      },
    });
  }

  createEvent(data: CreateEventData): Promise<Event> {
    return this.prisma.event.create({
      data,
    });
  }

  async updateEvent(
    id: string,
    userId: string,
    data: UpdateEventData,
  ): Promise<Event | null> {
    try {
      return await this.prisma.event.update({
        where: {
          id,
          userId,
        },
        data,
      });
    } catch (error: unknown) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        return null;
      }

      throw error;
    }
  }

  deleteEvent(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
