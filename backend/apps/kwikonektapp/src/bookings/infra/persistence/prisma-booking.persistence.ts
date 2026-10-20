import { Injectable } from '@nestjs/common';
import {
  BookingsRepository,
  CreateBookingData,
} from '../../domain/repositories/booking.repository';
import { Booking } from '../../domain/entities/booking.entity';
import { PrismaService } from '@lib/common/database/prisma/prisma.service';

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
}
