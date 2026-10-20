import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BookingsService } from '../application/bookings.service';
import { CreateBookingDto } from './dtos/create-booking.dto';
import { apiResponse } from '@lib/common';

@Controller('api/bookings')
export class BookingsController {
  constructor(private readonly bookingService: BookingsService) {}

  @Get()
  async getAllController() {
    const data = await this.bookingService.getAll();

    return apiResponse('Bookings fetched successfully', data);
  }

  @Get('/:id')
  async getBookingByIdController(@Param('id') id: string) {
    const data = await this.bookingService.getBookingById(id);

    return apiResponse(`Event with id ${id} found`, data);
  }

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
}
