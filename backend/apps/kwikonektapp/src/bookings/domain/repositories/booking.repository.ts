import {
  Booking,
  //   BookingStatus,
  //   ParticipationStatus,
} from '../entities/booking.entity';

export type CreateBookingData = {
  title: string;
  guestName: string;
  guestEmail: string;
  startTime: Date;
  endTime: Date;
  eventId: string;
  hostId: string;
};

export abstract class BookingsRepository {
  abstract findAll(): Promise<Booking[]>;

  abstract findBookingById(id: string): Promise<Booking | null>;

  abstract createBooking(data: CreateBookingData): Promise<Booking>;
}
