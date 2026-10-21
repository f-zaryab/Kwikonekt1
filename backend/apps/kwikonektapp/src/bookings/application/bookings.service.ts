import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BookingsRepository } from '../domain/repositories/booking.repository';
import { CreateBookingInput } from './dtos/create-booking.-input';
import {
  UpdateBookingGuestAttendenceStatus,
  UpdateBookingGuestDetailsInput,
  UpdateBookingHostAttendenceStatus,
  UpdateBookingMeetingLink,
  UpdateBookingSchedule,
  UpdateBookingStatus,
} from './dtos/update-booking.input';
// external
import { EventLookupPort } from './ports/event-lookup.port';

@Injectable()
export class BookingsService {
  constructor(
    private readonly bookingRepository: BookingsRepository,
    private readonly eventLookup: EventLookupPort,
  ) {}

  // Get All Bookings --------------------------------------------------------------//
  getAllBookings() {
    return this.bookingRepository.findAll();
  }

  // Get Specific Booking ----------------------------------------------------------//
  async getBookingById(id: string) {
    const booking = await this.bookingRepository.findBookingById(id);

    if (!booking) {
      throw new NotFoundException(`Booking with id:${id} not found`);
    }

    return booking;
  }

  // Update Booking: Attendence Guest Update ---------------------------------------//
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

  // Update Booking: Guest Details -------------------------------------------------//
  async updateBookingGuestDetails(
    data: UpdateBookingGuestDetailsInput,
    bookingId: string,
  ) {
    await this.getBookingById(bookingId);

    if (data.guestName === undefined && data.guestEmail === undefined) {
      throw new BadRequestException('No guest details provided.');
    }

    const updated = await this.bookingRepository.updateBooking(data, bookingId);

    if (!updated) {
      throw new NotFoundException('Booking not found');
    }

    return updated;
  }

  // Update Booking: Reschedule ----------------------------------------------------//
  async updateBookingSchedule(data: UpdateBookingSchedule, bookingId: string) {
    const booking = await this.getBookingById(bookingId);
    const startTime = data.startTime;

    if (!(startTime instanceof Date) || Number.isNaN(startTime.getTime())) {
      throw new BadRequestException('Invalid start time');
    }

    if (startTime <= new Date()) {
      throw new BadRequestException('Booking must be scheduled in the future');
    }

    if (booking.status === 'CANCELLED' || booking.status === 'COMPLETED') {
      throw new BadRequestException(
        'Cannot scheduled cancelled or completed bookings',
      );
    }

    const durationMs = booking.endTime.getTime() - booking.startTime.getTime();
    const endTime = new Date(startTime.getTime() + durationMs);

    const updated = await this.bookingRepository.updateBooking(
      {
        startTime,
        endTime,
      },
      bookingId,
    );

    if (!updated) {
      throw new NotFoundException('Booking not found');
    }

    return updated;
  }

  // Update Booking: Status Update -------------------------------------------------//
  async updateBookingStatus(data: UpdateBookingStatus, bookingId: string) {
    const booking = await this.getBookingById(bookingId);

    const allowedTransitions = {
      PENDING: ['CONFIRMED', 'CANCELLED'],
      CONFIRMED: ['COMPLETED', 'CANCELLED'],
      CANCELLED: [],
      COMPLETED: [],
    } as const;

    const allowed: readonly string[] = allowedTransitions[booking.status];

    if (!allowed.includes(data.status)) {
      throw new BadRequestException(
        `Cannot change booking status from ${booking.status} to ${data.status}`,
      );
    }

    const updated = await this.bookingRepository.updateBooking(
      {
        status: data.status,
      },
      bookingId,
    );

    if (!updated) {
      throw new NotFoundException('Booking not found');
    }

    return updated;
  }

  // Update Booking: Attendence Host Update ----------------------------------------//
  async updateBookingAttendenceHostStatus(
    data: UpdateBookingHostAttendenceStatus,
    bookingId: string,
  ) {
    const booking = await this.getBookingById(bookingId);

    if (booking.status === 'CANCELLED' || booking.status === 'COMPLETED') {
      throw new BadRequestException(
        'Cannot update attendance for a finalized booking',
      );
    }

    const updated = await this.bookingRepository.updateBooking(
      {
        hostAttendanceStatus: data.hostAttendanceStatus,
      },
      bookingId,
    );

    if (!updated) {
      throw new NotFoundException('Booking not found');
    }

    return updated;
  }

  // Update Booking: Attendence Guest Update ---------------------------------------//
  async updateBookingAttendenceGuestStatus(
    data: UpdateBookingGuestAttendenceStatus,
    bookingId: string,
  ) {
    const booking = await this.getBookingById(bookingId);

    if (booking.status === 'CANCELLED' || booking.status === 'COMPLETED') {
      throw new BadRequestException(
        'Cannot update attendance for a finalized booking',
      );
    }

    const updated = await this.bookingRepository.updateBooking(
      {
        guestAttendanceStatus: data.guestAttendanceStatus,
      },
      bookingId,
    );

    if (!updated) {
      throw new NotFoundException('Booking not found');
    }

    return updated;
  }

  // Update Booking: Attendence Guest Update ---------------------------------------//
  async updateBookingMeetingLink(
    data: UpdateBookingMeetingLink,
    bookingId: string,
  ) {
    const booking = await this.getBookingById(bookingId);

    if (booking.status === 'CANCELLED' || booking.status === 'COMPLETED') {
      throw new BadRequestException(
        'Cannot update meeting link for a finalized booking',
      );
    }

    const updated = await this.bookingRepository.updateBooking(
      {
        meetingLink: data.meetingLink,
      },
      bookingId,
    );

    if (!updated) {
      throw new NotFoundException('Booking not found');
    }

    return updated;
  }

  // Delete Booking ----------------------------------------------------------------//
  async deleteBooking(id: string) {
    const booking = await this.bookingRepository.findBookingById(id);

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    await this.bookingRepository.deleteBooking(id);
  }

  // Cancel Booking ----------------------------------------------------------------//
  async cancelBooking(bookingId: string) {
    const booking = await this.getBookingById(bookingId);

    if (booking.status === 'CANCELLED' || booking.status === 'COMPLETED') {
      throw new BadRequestException(
        'Cannot cancel booking which is already cancelled/completed',
      );
    }

    const updated = await this.bookingRepository.updateBooking(
      {
        status: 'CANCELLED',
      },
      bookingId,
    );

    if (!updated) {
      throw new NotFoundException('Booking not found');
    }

    return updated;
  }
}
