import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BookingsRepository } from '../domain/repositories/booking.repository';
import { CreateBookingInput } from './dtos/create-booking.-input';
// external
import { EventLookupPort } from './ports/event-lookup.port';

@Injectable()
export class BookingsService {
  constructor(
    private readonly bookingRepository: BookingsRepository,
    private readonly eventLookup: EventLookupPort,
  ) {}

  getAll() {
    return this.bookingRepository.findAll();
  }

  async getBookingById(id: string) {
    const data = await this.bookingRepository.findBookingById(id);

    if (!data) {
      throw new NotFoundException('Booking with event not found');
    }

    return data;
  }

  async createBooking(data: CreateBookingInput) {
    const event = await this.eventLookup.findById(data.eventId);

    if (!event || !event.isActive) {
      throw new NotFoundException('Event not found or is inactive');
    }

    const startTime = data.startTime;

    if (Number.isNaN(startTime.getTime())) {
      throw new BadRequestException('Invalid start time');
    }

    if (startTime <= new Date()) {
      throw new BadRequestException('Booking must be scheduled in the future');
    }

    const endTime = new Date(
      startTime.getTime() + event.durationMinutes * 60_000,
    );

    return await this.bookingRepository.createBooking({
      title: event.title,
      guestName: data.guestName,
      guestEmail: data.guestEmail,
      startTime,
      endTime,
      eventId: event.id,
      hostId: event.userId,
    });
  }
}
