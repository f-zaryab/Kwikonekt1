import {
  Booking,
  BookingStatus,
  ParticipationStatus,
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

export type UpdateBookingData = {
  guestName?: string;
  guestEmail?: string;

  startTime?: Date;
  endTime?: Date;

  status?: BookingStatus;

  guestAttendanceStatus?: ParticipationStatus;
  hostAttendanceStatus?: ParticipationStatus;

  meetingLink?: string | null;
};

export abstract class BookingsRepository {
  abstract findAll(): Promise<Booking[]>;

  abstract findBookingById(id: string): Promise<Booking | null>;

  abstract createBooking(data: CreateBookingData): Promise<Booking>;

  abstract updateBooking(
    data: UpdateBookingData,
    bookingId: string,
  ): Promise<Booking | null>;

  abstract deleteBooking(bookingId: string): Promise<void>;
}
