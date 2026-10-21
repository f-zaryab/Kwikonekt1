import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ParseUUIDPipe,
} from '@nestjs/common';
import { BookingsService } from '../application/bookings.service';
import { CreateBookingDto } from './dtos/create-booking.dto';
import {
  UpdateBookingGuestAttendenceStatusDto,
  UpdateBookingGuestDetailsDto,
  UpdateBookingHostAttendenceStatusDto,
  UpdateBookingMeetingLinkDto,
  UpdateBookingRescheduleDto,
  UpdateBookingStatusDto,
} from './dtos/update-booking.dto';
import { apiResponse } from '@lib/common';

@Controller('api/bookings')
export class BookingsController {
  constructor(private readonly bookingService: BookingsService) {}

  // Auth-(Host)
  // Get All Booking ----------------------------------------------------------------//
  @Get()
  async getAllBookingsController() {
    const data = await this.bookingService.getAllBookings();

    return apiResponse('Bookings fetched successfully', data);
  }

  // Auth-(Host + Guest)
  // Get Specific Booking -----------------------------------------------------------//
  @Get('/:id')
  async getBookingByIdController(@Param('id', new ParseUUIDPipe()) id: string) {
    const data = await this.bookingService.getBookingById(id);

    return apiResponse(`Event with id ${id} found`, data);
  }

  // Auth-(Host)
  // Create Booking ----------------------------------------------------------------//
  @Post('/')
  async createBookingController(@Body() data: CreateBookingDto) {
    const booking = await this.bookingService.createBooking({
      guestEmail: data.guestEmail,
      guestName: data.guestName,
      startTime: new Date(data.startTime),
      eventId: data.eventId,
    });

    return apiResponse('booking created', booking);
  }

  // Auth-(Host + Guest)
  // Update Booking: Guest Details -------------------------------------------------//
  @Patch('/:id/guest-details')
  async updateBookingGuestDetailsController(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() data: UpdateBookingGuestDetailsDto,
  ) {
    const booking = await this.bookingService.updateBookingGuestDetails(
      {
        guestName: data.guestName,
        guestEmail: data.guestEmail,
      },
      id,
    );

    return apiResponse(`Booking with id ${id} updated`, booking);
  }

  // Auth-(Host + Guest)
  // Update Booking: Reschedule ----------------------------------------------------//
  @Patch('/:id/reschedule')
  async updateBookingRescheduleController(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() data: UpdateBookingRescheduleDto,
  ) {
    const booking = await this.bookingService.updateBookingSchedule(
      {
        startTime: new Date(data.startTime),
      },
      id,
    );

    return apiResponse(`Booking with id ${id} updated`, booking);
  }

  // Auth-(Host)
  // Update Booking: Status Update -------------------------------------------------//
  @Patch('/:id/status')
  async updateBookingStatusController(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() data: UpdateBookingStatusDto,
  ) {
    const booking = await this.bookingService.updateBookingStatus(
      {
        status: data.status,
      },
      id,
    );

    return apiResponse(`Booking with id ${id} updated`, booking);
  }

  // Auth-(Host)
  // Update Booking: Host Attendence Update ----------------------------------------//
  @Patch('/:id/host-attendance')
  async updateBookingHostAttendenceController(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() data: UpdateBookingHostAttendenceStatusDto,
  ) {
    const booking = await this.bookingService.updateBookingAttendenceHostStatus(
      {
        hostAttendanceStatus: data.hostAttendanceStatus,
      },
      id,
    );

    return apiResponse(`Booking with id ${id} updated`, booking);
  }

  // Auth-(Guest)
  // Update Booking: Guest Attendence Update ---------------------------------------//
  @Patch('/:id/guest-attendance')
  async updateBookingGuestAttendenceController(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() data: UpdateBookingGuestAttendenceStatusDto,
  ) {
    const booking =
      await this.bookingService.updateBookingAttendenceGuestStatus(
        {
          guestAttendanceStatus: data.guestAttendanceStatus,
        },
        id,
      );

    return apiResponse(`Booking with id ${id} updated`, booking);
  }

  // Auth-(Host)
  // Update Booking: Meeting Link Update -------------------------------------------//
  @Patch('/:id/meeting-link')
  async updateBookingMeetingLinkController(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() data: UpdateBookingMeetingLinkDto,
  ) {
    const booking = await this.bookingService.updateBookingMeetingLink(
      {
        meetingLink: data.meetingLink,
      },
      id,
    );

    return apiResponse(`Booking with id ${id} updated`, booking);
  }

  // Auth-(Host)
  // Delete Specific Booking -------------------------------------------------------//
  @Delete('/:id')
  async deleteBookingController(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.bookingService.deleteBooking(id);

    return apiResponse('Booking deleted successfully', null);
  }

  // Auth-(guest)
  // Cancel Specific Booking -------------------------------------------------------//
  @Patch('/:id/cancel-booking')
  async cancelBookingController(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.bookingService.cancelBooking(id);

    return apiResponse('Booking cancelled successfully', null);
  }
}
