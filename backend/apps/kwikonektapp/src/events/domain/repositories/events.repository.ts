import { Event } from '../entities/event.entity';

export type CreateEventData = {
  slug: string;
  title: string;
  description: string | null;
  durationMinutes: number;
  isActive: boolean;
  userId: string;
};

export type UpdateEventData = {
  slug?: string;
  title?: string;
  description?: string | null;
  durationMinutes?: number;
  isActive?: boolean;
};

export abstract class EventsRepository {
  abstract findAll(): Promise<Event[]>;

  abstract findEventById(id: string): Promise<Event | null>;

  abstract createEvent(data: CreateEventData): Promise<Event>;

  abstract updateEvent(
    id: string,
    userId: string,
    data: UpdateEventData,
  ): Promise<Event | null>;

  abstract deleteEvent(): Promise<void>;
}
