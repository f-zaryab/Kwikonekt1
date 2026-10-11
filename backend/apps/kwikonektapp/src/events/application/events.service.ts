import { Injectable, NotFoundException } from '@nestjs/common';
import { EventsRepository } from '../domain/repositories/events.repository';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';

@Injectable()
export class EventsService {
  constructor(private readonly eventsRepo: EventsRepository) {}

  getAllEvents() {
    return this.eventsRepo.findAll();
  }

  async getEventById(id: string) {
    const event = await this.eventsRepo.findEventById(id);

    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    return event;
  }

  async createEvent(data: CreateEventInput) {
    return this.eventsRepo.createEvent({
      slug: data.slug,
      title: data.title,
      description: data.description ?? null,
      durationMinutes: data.durationMinutes ?? 30,
      isActive: data.isActive ?? true,
      userId: data.userId,
    });
  }

  async updateEvent(id: string, userId: string, data: UpdateEventInput) {
    const event = await this.eventsRepo.updateEvent(id, userId, data);

    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    return event;
  }

  async deleteEvent(id: string, userId: string) {
    const event = await this.eventsRepo.findEventById(id);

    if (!event || event.userId !== userId) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    await this.eventsRepo.deleteEvent(id, userId);
  }
}
