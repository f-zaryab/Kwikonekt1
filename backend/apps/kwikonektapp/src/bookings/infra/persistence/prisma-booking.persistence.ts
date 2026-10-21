import { Injectable } from '@nestjs/common';
import {
  BookingsRepository,
  CreateBookingData,
  UpdateBookingData,
} from '../../domain/repositories/booking.repository';
import { Booking } from '../../domain/entities/booking.entity';
// external
import { PrismaService } from '@lib/common/database/prisma/prisma.service';
import { Prisma } from 'generated/prisma/client';

@Injectable()
export class PrismaBookingRepository extends BookingsRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  findAll(): Promise<Booking[]> {
    return this.prisma.booking.findMany();
  }

  findBookingById(id: string): Promise<Booking | null> {
    return this.prisma.booking.findUnique({
      where: {
        id,
      },
    });
  }

  createBooking(data: CreateBookingData): Promise<Booking> {
    return this.prisma.booking.create({
      data,
    });
  }

  async updateBooking(
    data: UpdateBookingData,
    bookingId: string,
  ): Promise<Booking | null> {
    try {
      return await this.prisma.booking.update({
        where: {
          id: bookingId,
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

  async deleteBooking(bookingId: string): Promise<void> {
    await this.prisma.booking.delete({
      where: {
        id: bookingId,
      },
    });
  }
}
