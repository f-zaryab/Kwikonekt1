import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { BookingsController } from '../api/bookings.controller';
import { BookingsService } from '../application/bookings.service';

describe('BookingsController', () => {
  let controller: BookingsController;

  const mockBookingsService = {
    getAll: vi.fn(),
    getBookingById: vi.fn(),
    createBooking: vi.fn(),
  };

  beforeEach(async () => {
    vi.resetAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingsController],
      providers: [
        {
          provide: BookingsService,
          useValue: mockBookingsService,
        },
      ],
    }).compile();

    controller = module.get<BookingsController>(BookingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
